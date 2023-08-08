// +page.server.ts
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db';
import { posts, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from '$lib/server/cloudinary';

const profileFormSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(32),
	bio: z.string().max(300).nullable(),
	location: z.string().max(30).nullable(),
	website: z.string().max(100).nullable()
});

export const load = async ({ locals }) => {
	const timeline = await db.query.posts.findMany({
		where: eq(posts.user_id, locals.session.user.userId),
		with: {
			user: true
		}
		// orderBy: (posts, {asc}) => [asc(posts.)]
	});
	return { timeline };
};

export const actions: Actions = {
	update: async ({ request }) => {
		const formData = await request.formData();

		const form = await superValidate(formData, profileFormSchema);
		console.log('POST', form);
		if (!form.valid) {
			console.log('FORM IS INVALID');
			return fail(400, { form });
		}

		const { id, ...profile } = form.data;
		console.log('BANNER:', formData.get('banner'));
		console.log('AVATAR:', formData.get('avatar'));

		const banner = formData.get('banner') as File;
		const avatar = formData.get('avatar') as File;

		const profile2 = {
			...profile,
			banner: null,
			avatar: null
		};
		if (banner.size) {
			const response = await uploadImage(banner);
			if (!response.ok) return;
			profile2.banner = response.url;
		}

		if (avatar.size) {
			const response = await uploadImage(avatar);
			if (!response.ok) return;
			profile2.avatar = response.url;
		}

		try {
			await db.update(users).set(profile2).where(eq(users.id, id));
		} catch (error) {
			throw new Error('db server error');
		}

		return { form };
	}
};
