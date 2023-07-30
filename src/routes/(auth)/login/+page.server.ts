import { z } from 'zod';
// import { authenticateAccount } from '$lib/db.js';
import { message, superValidate } from 'sveltekit-superforms/server';
import { authenticateAccount } from '$lib/server/db';
import { createSession } from '$lib/server/utils';
// import { createSession } from '$lib/utils';

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

		const account = await authenticateAccount(email, password);

		if (!account) {
			return message(loginForm, 'Invalid email or password', { status: 404 });
		}
		await createSession(account, cookies);
		return { loginForm };
	}
};
