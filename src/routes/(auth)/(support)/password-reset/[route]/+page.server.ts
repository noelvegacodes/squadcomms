import { passwordReset } from '$lib/server/session/account.js';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailSchema = z.object({
	accountId: z.number(),
	password: z.string().min(6, { message: 'password must be at least 6 characters' }).trim()
});

export const load = async ({ locals, cookies }) => {
	const { passwordResetSession } = locals;

	const passwordResetForm = await superValidate(emailSchema);

	if (!passwordResetSession) {
		throw redirect(302, '/login');
	}
	return { passwordResetSession, passwordResetForm };
};

export const actions = {
	default: async ({ request, cookies, locals }) => {
		console.log('reseting password');
		const passwordResetForm = await superValidate(request, emailSchema);

		if (!passwordResetForm.valid) {
			console.log('form is invalid');
			return message(passwordResetForm, 'invalid form', { status: 400 });
		}

		const { password, accountId } = passwordResetForm.data;
		console.log('PASSWORD RESET:', password, accountId, locals.passwordResetSession.data.accountId);
		await passwordReset.session.destroy(cookies);
		await passwordReset.updatePassword(locals.passwordResetSession.data.accountId, password);
		return { passwordResetForm };
	}
};
