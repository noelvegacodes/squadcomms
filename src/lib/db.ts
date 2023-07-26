import { PUBLIC_DATABASE_URL } from '$env/static/public';

import { neon } from '@neondatabase/serverless';
const sql = neon(PUBLIC_DATABASE_URL);

// console.log(sql`SELECT NOW()`);

export async function helloWorld() {
	const start = new Date() as any;
	const [dbResponse] = await sql`SELECT NOW()`;
	const now = dbResponse.now;
	const end = new Date() as any;
	return { now, latency: Math.abs(end - start) };
}
