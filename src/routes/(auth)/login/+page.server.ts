import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

const loginSchema = z.object({
	email: z.string().email().trim(),
	password: z.string().trim()
});

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/profile/timeline');
	const loginForm = await superValidate(loginSchema);
	return { loginForm };
};

export const actions = {
	default: async ({ request, locals }) => {
		const loginForm = await superValidate(request, loginSchema);
		if (!loginForm.valid) {
			return message(loginForm, 'invalid form', { status: 400 });
		}
		const { email, password } = loginForm.data;

		try {
			const user = await auth.useKey('username', email, password);

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e: any) {
			console.log('something went wrong', e.message);
		}

		throw redirect(302, '/profile/timeline');
	}
};
