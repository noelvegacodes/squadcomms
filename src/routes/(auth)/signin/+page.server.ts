// routes/signin/+page.server.ts
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { setFlash } from 'sveltekit-flash-message/server';

const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(32)
});

export const load = async () => {
	const form = await superValidate(signinSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		console.log('Sign in');
		const form = await superValidate(event.request, signinSchema);

		if (!form.valid) {
			return fail(400, { form, message: 'form is invalid' });
		}

		let handle;
		try {
			// find user by key
			// and validate password
			console.log('ATTEMPT SESSION');
			const key = await auth.useKey('email', form.data.email.toLowerCase(), form.data.password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			console.log('SESSION CREATED:', session);
			event.locals.auth.setSession(session); // set session cookie
			handle = session.user.handle;
		} catch (e: any) {
			console.log(e.message);
			setFlash({ type: 'error', message: 'Invalid credentials' }, event);
		}
		if (handle) {
			console.log('redirect');
			throw redirect(302, `/${handle}`);
		}
		console.log('Settings flash message');
		setFlash({ type: 'error', message: 'Invalid credentials' }, event);
		return { form };
		// throw redirect(302, `/${session.user.handle}`);

		// redirect to profile page
		// make sure you don't throw inside a try/catch block!
	}
};
