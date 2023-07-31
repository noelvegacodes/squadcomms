import { PRIVATE_DEV_URL, VERCEL_URL } from '$env/static/private';
import { qstash, redis } from '$lib/server/upstash';
import type { AccountWithoutPassword, AccountSession } from '$lib/types';
import type { Cookies } from '@sveltejs/kit';
import { compareSync } from 'bcrypt';

type CreateSessionParams<T> = {
	key: string;
	seconds: number;
	cookies: Cookies;
	data: T;
};

export const account = {
	forgetPassword: {
		session: {
			key: 'fp_session_id',
			get: function () {},
			create: async function () {},
			destory: function () {}
		}
	}
};

export async function createForgetPasswordSession(email: string, cookies: Cookies) {
	const fpid = crypto.randomUUID();
	const expireAt = new Date().getTime() / 1000 + 60 * 5;

	try {
		cookies.set('fpid', fpid, { maxAge: 60 * 5, path: '/', httpOnly: true });
		await redis.hset(fpid, { email, expireAt });
	} catch {
		throw new Error('server error: unable to create session');
	}

	try {
		// create delayed message to cleanup an expired user session in upstash qstash
		await qstash.publishJSON({
			body: { type: 'forget-password-session', fpid },
			// PRIVATE_DEV_URL is an ngrok endpoint
			// TODO: Figure out how to get access to VERCEL_URL system env variable
			url: 'https://' + VERCEL_URL + '/api/chron',
			retries: 3,
			delay: 60 * 5,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch {
		throw new Error(`server error: unable to create session cleanup msg`);
	}
}
