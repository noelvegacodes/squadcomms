// routes/password-reset/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { generatePasswordResetToken } from '$lib/server/token';
import { sendPasswordResetLink } from '$lib/server/email';

const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== 'string') return false;
	if (maybeEmail.length > 255) return false;
	const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail);
};

import type { Actions } from './$types';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		// basic check
		if (!isValidEmail(email)) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		try {
			const storedUser = (
				await db.select().from(users).where(eq(users.email, email.toLowerCase()))
			)[0];
			if (!storedUser) {
				return fail(400, {
					message: 'User does not exist'
				});
			}
			const user = auth.transformDatabaseUser(storedUser);
			const token = await generatePasswordResetToken(user.userId);
			await sendPasswordResetLink(user.email, token);
			return {
				success: true
			};
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};
