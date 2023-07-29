import { dev } from '$app/environment';
import { PRIVATE_DEV_URL, VERCEL_URL } from '$env/static/private';
import { qstash, redis } from '$lib/server/upstash';
import type { AccountWithoutPassword } from '$lib/types';
import type { Cookies } from '@sveltejs/kit';

export async function createSession(account: AccountWithoutPassword, cookies: Cookies) {
	console.log('creating session');
	const weekInSeconds = 60 * 60 * 24 * 7;
	const expireAt = new Date().getTime() / 1000 + weekInSeconds;
	const sid = crypto.randomUUID();

	try {
		cookies.set('sid', sid, { httpOnly: true, maxAge: weekInSeconds, path: '/' });
		await redis.hset(sid, { account, expireAt });
	} catch {
		throw new Error('server error: unable to create session');
	}

	console.log('creating session clean up msg');
	try {
		// create delayed message to cleanup an expired user session in upstash qstash
		await qstash.publishJSON({
			body: { sid },
			// PRIVATE_DEV_URL is an ngrok endpoint
			// TODO: Figure out how to get access to VERCEL_URL system env variable
			url: 'https://' + VERCEL_URL + '/api/chron',
			retries: 3,
			delay: 30,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch {
		throw new Error(`server error: unable to create session cleanup msg: ${VERCEL_URL}`);
	}
}
