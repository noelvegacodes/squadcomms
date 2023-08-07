// routes/signin/+page.server.ts
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(32)
});

export const load = async () => {
	const form = await superValidate(signinSchema);
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signinSchema);

		if (!form.valid) {
			return fail(400, { form, message: 'form is invalid' });
		}

		let handle;
		try {
			// find user by key
			// and validate password
			const key = await auth.useKey('email', form.data.email.toLowerCase(), form.data.password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
			handle = session.user.handle;
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: 'Incorrect email or password'
				});
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		if (handle) {
			console.log('redirect');
			throw redirect(302, `/${handle}`);
		}

		return { form };
		// throw redirect(302, `/${session.user.handle}`);

		// redirect to profile page
		// make sure you don't throw inside a try/catch block!
	}
};
