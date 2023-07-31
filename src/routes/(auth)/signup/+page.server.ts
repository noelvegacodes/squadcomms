import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { account } from '$lib/server/session/account';
import { redirect } from '@sveltejs/kit';
const signupSchema = z.object({
	email: z.string().email().trim(),
	handle: z.string().trim().min(4),
	password: z.string().trim().min(6, { message: 'password must be more than 6 characters' })
});

// import { createSession } from '$lib/utils.js';

export const load = async ({ locals }) => {
	const { accountSession } = locals;
	if (accountSession) {
		throw redirect(302, '/protected');
	}
	const signupForm = await superValidate(signupSchema);
	return { signupForm };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const signupForm = await superValidate(request, signupSchema);

		if (!signupForm.valid) {
			return message(signupForm, 'invalid inputs', { status: 400 });
		}

		try {
			const newAccount = await account.create(signupForm.data);

			await account.session.create(newAccount, cookies);
			return { signupForm };
		} catch (err: any) {
			return message(signupForm, err.message, { status: 400 });
		}
	}
};
