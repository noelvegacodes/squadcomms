import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq, like } from 'drizzle-orm';

export async function GET(e) {
	const thing = e.url.searchParams.get('search');
	console.log(e);
	const user = ['Harry', 'Noel', 'Charlie'];

	if (!thing) return json([]);
	const data = await db.query.users.findMany({
		where: like(users.handle, `%${thing}%`),
		columns: {
			name: true,
			handle: true,
			avatar: true
		}
	});

	console.log(data);
	return json(data);
}
