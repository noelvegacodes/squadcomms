import type { Session } from '$lib/types';
import { redis } from '$lib/server/upstash';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('HOOK: ', new Date());
	const sid = event.cookies.get('sid');
	if (!sid) {
		console.log('no cookie session found');
		return await resolve(event);
	}

	const start = new Date();
	const session = await redis.hgetall<Session>(sid);
	const end = new Date();
	// @ts-ignore
	const latency = end - start;
	console.log(console.log('latency: ', latency));
	if (!session) {
		console.log('could not find session in redis');
		return await resolve(event);
	}

	event.locals.session = session;
	return await resolve(event);
};
