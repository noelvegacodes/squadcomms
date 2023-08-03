import { InsertPost } from '$lib/server/db/queries';
import { account } from '$lib/server/session/account.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const session = await account.session.get(cookies);

		if (!session) {
			console.log('no session found');
			return fail(404, { ok: false, message: 'authentication error: unable to create post' });
		}
		console.log(session);
		const data = Object.fromEntries(await request.formData());
		InsertPost({ authorId: session.data.id, text: data.text as string });
		console.log(data);

		console.log('hello');
	}
};
