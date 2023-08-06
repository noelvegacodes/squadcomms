// routes/signup/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';

import type { Actions } from './$types';

const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== 'string') return false;
	if (maybeEmail.length > 255) return false;
	const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail);
};

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (!session.user.email_verified) throw redirect(302, '/email-verification');
		throw redirect(302, '/profile');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const handle = formData.get('handle');
		const name = formData.get('name');
		// basic check
		console.log('DATA:', email, password);
		if (!isValidEmail(email)) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		if (!handle || typeof handle !== 'string') {
			return fail(400, {
				message: 'Invalid password'
			});
		}
		if (!name || typeof name !== 'string') {
			return fail(400, {
				message: 'Invalid password'
			});
		}
		console.log('creating user');
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: email.toLowerCase(), // unique id when using "email" auth method
					password // hashed by Lucia
				},
				attributes: {
					email: email.toLowerCase(),
					email_verified: false,
					name,
					handle, // `Number(false)` if stored as an integer
					avatar: null
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie

			const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink(email, token);
		} catch (e: any) {
			// this part depends on the database you're using
			// check for unique constraint error in user table
			// if (e instanceof SomeDatabaseError && e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR) {
			// 	return new Response('Account already exists', {
			// 		status: 400
			// 	});
			// }
			console.log('DB Error', e.message);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/email-verification');
	}
};
