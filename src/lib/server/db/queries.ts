import { db } from '$lib/server/db';
import { PostsTable } from './schema';

export async function InsertPost(post: { authorId: number; text: string }) {
	await db.insert(PostsTable).values(post);
}
