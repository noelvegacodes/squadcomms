import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { createAccount, findAccount } from '$lib/server/db.js';
import { createSession } from '$lib/server/utils';
const signupSchema = z.object({
	email: z.string().email().trim(),
	handle: z.string().trim().min(4),
	password: z.string().trim().min(6, { message: 'password must be more than 6 characters' })
});

// import { createSession } from '$lib/utils.js';

export const load = async () => {
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
			const existingAccount = await findAccount(signupForm.data.email, signupForm.data.handle);

			if (existingAccount) {
				return message(signupForm, 'Email or handle taken', { status: 400 });
			}

			const newAccount = await createAccount(signupForm.data);
			await createSession(newAccount, cookies);
			return { signupForm };
		} catch (err: any) {
			return message(signupForm, err.message, { status: 400 });
		}
	}
};
