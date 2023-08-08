import { redirect, fail } from '@sveltejs/kit';
import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { setFlash } from 'sveltekit-flash-message/server';

const resend = z.object({ email: z.string().email() });

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, '/signin');
	}

	if (session && session.user.email_verified) {
		throw redirect(302, `/home`);
	}
	const form = superValidate({ email: session.user.email }, resend);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, resend);
		const session = await event.locals.auth.validate();
		if (!session) throw redirect(302, '/signin');
		if (session.user.email_verified) {
			throw redirect(302, '/home');
		}
		try {
			console.log('GENEARATING TOKEN');
			const token = await generateEmailVerificationToken(session.user.userId);
			await sendEmailVerificationLink(session.user.email, token);
			setFlash(
				{ type: 'emailVerification', message: `Email sent to ${session.user.email}` },
				event
			);
			return {
				success: true,
				form
			};
		} catch {
			return fail(500, {
				message: 'An unknown error occurred',
				form
			});
		}

		return { form };
	}
};
