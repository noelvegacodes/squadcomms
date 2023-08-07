import { uploadImage } from '$lib/server/cloudinary';
import { db } from '$lib/server/db/index';
import { posts } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const postFormSchema = z.object({
	text: z.string().max(10)
});

export const load = async ({ locals }) => {
	const session = locals.session;
	if (!session) throw redirect(302, '/signin');
	const form = await superValidate(postFormSchema);
	return { form };
};

export const actions = {
	createPost: async ({ request, locals }) => {
		console.log('Create POST');
		const session = locals.session;
		if (!session) throw redirect(302, '/signin');
		const formData = await request.formData();

		const form = await superValidate(formData, postFormSchema);
		const img = formData.get('postImg') as File;
		console.log(form);
		console.log(img);
		if (!form.valid) {
			return fail(400, { form });
		}

		let imgUrl = null;
		if (img.size) {
			const response = await uploadImage(img);
			if (!response.ok) return;
			imgUrl = response.url;
		}

		try {
			await db.insert(posts).values({
				id: nanoid(),
				text: form.data.text,
				user_id: session.user.userId,
				image: imgUrl
			});
		} catch {
			return fail(400, { message: 'db server error: unable to create post' });
		}
	}
};
