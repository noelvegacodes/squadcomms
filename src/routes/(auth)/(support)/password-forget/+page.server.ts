import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { account, passwordReset } from '$lib/server/session/account';
import { resend } from '$lib/resend';
import { render } from 'svelte-email';
import PasswordReset from '$lib/resend/emails/PasswordReset.svelte';

const emailSchema = z.object({
	email: z.string().email().trim()
});

export const load = async ({ locals }) => {
	const { passwordResetSession } = locals;
	const forgetPasswordForm = await superValidate(emailSchema);
	return { forgetPasswordForm, passwordResetSession };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const forgetPasswordForm = await superValidate(request, emailSchema);

		if (!forgetPasswordForm.valid) {
			return message(forgetPasswordForm, 'invalid form', { status: 400 });
		}

		const { email } = forgetPasswordForm.data;

		const foundAccount = await account.get(email);
		if (!foundAccount) {
			return { forgetPasswordForm };
		}

		const passwordSessionId = await passwordReset.session.create(foundAccount.id, cookies);

		const html = render({
			template: PasswordReset,
			props: {
				passwordSessionId
			}
		});

		await resend.emails.send({
			from: 'Build Story <support@buildstory.io>',
			to: email,
			headers: {
				'X-Entity-Ref-ID': crypto.randomUUID()
			},
			subject: 'Reset Password',
			html: html
		});

		return { forgetPasswordForm };
	}
};
