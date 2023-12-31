// routes/email-verification/[token]/+server.ts
import { auth } from '$lib/server/lucia';
import { validateEmailVerificationToken } from '$lib/server/token';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { token } = params;
	try {
		const user_id = await validateEmailVerificationToken(token);
		const user = await auth.getUser(user_id);
		await auth.invalidateAllUserSessions(user.userId);
		await auth.updateUserAttributes(user.userId, {
			email_verified: true // `Number(true)` if stored as an integer
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/${session.user.handle}`
			}
		});
	} catch {
		return new Response('Invalid email verification link', {
			status: 400
		});
	}
};
