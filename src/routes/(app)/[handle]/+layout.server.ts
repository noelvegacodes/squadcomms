// +page.server.ts
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { any, z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const profileFormSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(32),
	bio: z.string().max(300).nullable(),
	location: z.string().max(30).nullable(),
	website: z.string().max(100).nullable(),
	banner: z.any().nullable()
});

export const load = async ({ params }) => {
	let user;
	try {
		user = (await db.select().from(users).where(eq(users.handle, params.handle)))[0];
	} catch {
		console.log('server error: unable to get user');
	}
	if (!user?.id) {
		throw redirect(302, '/home');
	}
	const form = await superValidate(user, profileFormSchema);
	console.log('LAYOUT LOAD', new Date());
	return { user, form };
};
