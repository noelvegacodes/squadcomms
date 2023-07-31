import { account } from '$lib/server/session/account';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		await account.session.destory(cookies);
		throw redirect(302, '/');
	}
};
