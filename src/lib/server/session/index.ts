import type { Cookies } from '@sveltejs/kit';
import { redis } from '../upstash';

export const session = { get, create, destroy };

type CreateSessionParams<T> = {
	key: string;
	seconds: number;
	cookies: Cookies;
	data: T;
};

async function create<T>({ key, seconds, cookies, data }: CreateSessionParams<T>) {
	const expireAtInSeconds = new Date().getTime() / 1000 + seconds;
	const sid = crypto.randomUUID();

	try {
		await redis.hset(sid, { data, expireAtInSeconds });
		cookies.set(key, sid, {
			httpOnly: true,
			maxAge: seconds,
			path: '/',
			secure: true
		});
		return sid;
	} catch {
		throw new Error(`server error: unable to create ${key} session`);
	}
}

async function get<T>(key: string, cookies: Cookies) {
	const sid = cookies.get(key);
	if (sid) {
		const session = await redis.hgetall<T & { sessionExpiry: number }>(sid);
		const nowInSeconds = new Date().getTime() / 1000;
		if (!session) {
			return null;
		}

		if (nowInSeconds > session.sessionExpiry) {
			await destroy(key, cookies);
			return { ...session };
		}

		return session;
	}
	return null;
}

async function destroy(key: string, cookies: Cookies) {
	const sid = cookies.get(key);
	if (sid) {
		cookies.delete(key, { path: '/', secure: true, httpOnly: true, sameSite: true });
		await redis.del(sid);
	}
}
