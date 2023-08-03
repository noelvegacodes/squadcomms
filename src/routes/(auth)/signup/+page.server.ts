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
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/profile/timeline');
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
					handle
				}
			});

			console.log('USER:', user);

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

// import { createSession } from '$lib/utils.js';

// export const load = async ({ locals }) => {
// 	const { accountSession } = locals;
// 	if (accountSession) {
// 		throw redirect(302, '/profile');
// 	}
// 	const signupForm = await superValidate(signupSchema);
// 	return { signupForm };
// };

// export const actions = {
// 	default: async ({ request, cookies }) => {
// 		const signupForm = await superValidate(request, signupSchema);

// 		if (!signupForm.valid) {
// 			return message(signupForm, 'invalid inputs', { status: 400 });
// 		}

// 		try {
// 			await clerk.users.createUser({ emailAddress: [signupForm.data.email] });
// 			const newAccount = await account.create(signupForm.data);

// 			await account.session.create(newAccount, cookies);
// 			return { signupForm };
// 		} catch (err: any) {
// 			return message(signupForm, err.message, { status: 400 });
// 		}
// 	}
// };
