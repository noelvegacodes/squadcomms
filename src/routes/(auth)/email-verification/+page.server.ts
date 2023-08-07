// routes/email-verification/+page.server.ts
import { redirect, type Actions, fail } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	if (!session) throw redirect(302, '/signin');
	if (session.user.email_verified) {
		throw redirect(302, '/profile');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = locals.session;
		if (!session) throw redirect(302, '/signin');
		if (session.user.email_verified) {
			throw redirect(302, '/');
		}
		try {
			const token = await generateEmailVerificationToken(session.user.userId);
			await sendEmailVerificationLink(session.user.email, token);
			return {
				success: true
			};
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};
