import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { account } from '$lib/server/session/account';

const loginSchema = z.object({
	email: z.string().email().trim(),
	password: z.string().trim()
});

export const load = async () => {
	const loginForm = await superValidate(loginSchema);
	return { loginForm };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const loginForm = await superValidate(request, loginSchema);

		if (!loginForm.valid) {
			return message(loginForm, 'invalid form', { status: 400 });
		}

		const { email, password } = loginForm.data;

		// const account = await authenticateAccount(email, password);

		const authenticatedAccount = await account.authenticate(email, password);

		if (!authenticatedAccount) {
			return message(loginForm, 'Invalid email or password', { status: 404 });
		}
		await account.session.create(authenticatedAccount, cookies);
		return { loginForm };
	}
};
