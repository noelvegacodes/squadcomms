import { db } from '$lib/server/db/index';
import { posts } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const load = async ({ locals, route }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/signin');
	return { ...session.user };
};

export const actions = {
	// default: async ({ locals, route }) => {
	// 	// await db.query.users.findFirst({
	// 	// 	with: {
	// 	// 		posts: true
	// 	// 	}
	// 	// });
	// },
	createPost: async ({ request, locals }) => {
		console.log('Create POST');
		const formData = Object.fromEntries(await request.formData());
		const text = formData.text;

		if (typeof text !== 'string') return;
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/signup');

		try {
			await db.insert(posts).values({ id: nanoid(), text, user_id: session.user.userId });
		} catch (e) {
			return fail(400, { message: 'db server error: unable to create post' });
		}
	}
};
