import { redis } from '$lib/server/upstash.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const body = await request.json();
	const { sid } = body as { sid: string };
	console.log('CHRON API:', body);

	await redis.del(sid);

	return json({});
}
