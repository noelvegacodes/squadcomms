// +page.server.ts
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
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

type ProfileForm = z.infer<typeof profileFormSchema>;
export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	console.log('SESSION', session);
	if (!session) throw redirect(302, '/signin');
	if (!session.user.email_verified) {
		throw redirect(302, '/email-verification');
	}

	try {
		const user = (await db.select().from(users).where(eq(users.id, session.user.userId)))[0];

		const form = await superValidate(user, profileFormSchema);

		return { ...user, form };
	} catch {
		console.log('server error: unable to get user');
	}
	throw redirect(302, '/');
};
