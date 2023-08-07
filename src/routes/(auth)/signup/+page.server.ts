// routes/signup/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';
import { z } from 'zod';

const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(32),
	name: z.string().min(1).max(32),
	handle: z
		.string()
		.refine((val) => !['messages', 'home', 'notifications', 'projects'].includes(val))
});

import { superValidate } from 'sveltekit-superforms/server';

export const load = async () => {
	const form = await superValidate(signupSchema);
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signupSchema);

		if (!form.valid) {
			return fail(400, { message: 'Could not create account' });
		}
		console.log('creating user');
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: form.data.email.toLowerCase(), // unique id when using "email" auth method
					password: form.data.password // hashed by Lucia
				},
				attributes: {
					email: form.data.email.toLowerCase(),
					email_verified: false,
					name: form.data.name,
					handle: form.data.handle, // `Number(false)` if stored as an integer
					avatar: null
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie

			const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink(form.data.email, token);
		} catch (e: any) {
			console.log('DB Error', e.message);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/email-verification');
	}
};
