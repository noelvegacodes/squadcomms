import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

const signupSchema = z.object({
	email: z.string().email().trim(),
	handle: z.string().trim().min(4),
	name: z.string().trim().min(1),
	password: z.string().trim().min(6, { message: 'password must be more than 6 characters' })
});

export const load = async ({ locals }) => {
	const session = locals.session;
	if (session) throw redirect(302, '/profile');
	const signupForm = await superValidate(signupSchema);

	return { signupForm };
};

export const actions = {
	default: async ({ request, locals }) => {
		const signupForm = await superValidate(request, signupSchema);
		if (!signupForm.valid) {
			console.log(signupForm);
			return message(signupForm, 'invalid inputs', { status: 400 });
		}

		const { email, name, handle, password } = signupForm.data;

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: email,
					password
				},
				attributes: {
					email,
					name,
					handle,
					email_verified: false,
					avatar: null
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e: any) {
			console.log('something went wrong', e.message);
		}

		return { signupForm };
	}
};
