// lib/server/email.ts
import { resend } from '$lib/resend';
import EmailValidation from '$lib/resend/emails/EmailValidation.svelte';
import PasswordReset from '$lib/resend/emails/PasswordReset.svelte';
import { render } from 'svelte-email';

export const sendEmailVerificationLink = async (email: string, token: string) => {
	const url = `http://localhost:5173/email-verification/${token}`;

	const html = render({
		template: EmailValidation,
		props: {
			confirmationLink: url
		}
	});
	await resend.sendEmail({
		from: 'noel@buildstory.io',
		to: email,
		subject: 'Email Validation',
		html
	});
};

export const sendPasswordResetLink = async (email: string, token: string) => {
	const url = `http://localhost:5173/password-reset/${token}`;

	const html = render({
		template: PasswordReset,
		props: {
			passwordResetLink: url
		}
	});
	await resend.sendEmail({
		from: 'noel@buildstory.io',
		to: email,
		subject: 'Email Validation',
		html
	});
};
