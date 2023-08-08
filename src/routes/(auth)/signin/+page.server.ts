// routes/signin/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { setFlash } from 'sveltekit-flash-message/server';

const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(32)
});

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (session.user.email_verified) {
			throw redirect(302, `/home`);
		} else {
			throw redirect(302, `/email-verification`);
		}
	}

	const form = await superValidate(signinSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, signinSchema);

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
			event.locals.auth.setSession(session); // set session cookie
			handle = session.user.handle;
		} catch (e: any) {
			if (e.message === 'AUTH_INVALID_PASSWORD') {
				setFlash({ type: 'error', message: 'Invalid credentials' }, event);
			}
			console.log(e.message);
		}
		if (handle) {
			throw redirect(302, `/${handle}`);
		}
		setFlash({ type: 'error', message: 'Invalid credentials' }, event);
		return { form };
		// throw redirect(302, `/${session.user.handle}`);

		// redirect to profile page
		// make sure you don't throw inside a try/catch block!
	}
};
