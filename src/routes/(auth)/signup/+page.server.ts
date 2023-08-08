import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';
import { z } from 'zod';
import { setFlash } from 'sveltekit-flash-message/server';

const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(32),
	name: z.string().min(1).max(32),
	handle: z
		.string()
		.refine((val) => !['messages', 'home', 'notifications', 'projects'].includes(val))
});

import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session?.user.email_verified) {
		throw redirect(302, `/${session.user.handle}`);
	} else {
		const form = await superValidate(signupSchema);
		return { form };
	}
};

export const actions = {
	signup: async (event) => {
		const form = await superValidate(event.request, signupSchema);

		if (!form.valid) {
			return fail(400, { message: 'Could not create account' });
		}
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
			event.locals.auth.setSession(session); // set session cookie

			const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink(form.data.email, token);
		} catch (e: any) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// make sure you don't throw inside a try/catch bloc	k!
		setFlash(
			{ type: 'emailVerification', message: 'Check your email to verify and sign in' },
			event
		);
		throw redirect(302, '/email-verification');
		return { form };
	}
};
