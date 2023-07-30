import { redis } from '$lib/server/upstash';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		const sid = cookies.get('sid');
		if (!sid) {
			throw redirect(302, '/');
		}

		cookies.delete('sid');
		await redis.del(sid);
		console.log('redirect to home');
		throw redirect(302, '/');
	}
};
