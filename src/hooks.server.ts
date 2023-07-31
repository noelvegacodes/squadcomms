import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { account, passwordReset } from '$lib/server/session/account';

export const accountSession: Handle = async ({ event, resolve }) => {
	console.log('HOOK | Account Session:', new Date());

	const session = await account.session.get(event.cookies);
	// const session = null;

	if (!session) {
		return await resolve(event);
	}

	event.locals.accountSession = session;
	return await resolve(event);
};

export const passwordResetSession: Handle = async ({ event, resolve }) => {
	if (
		event.url.pathname.startsWith('/password-reset/') ||
		event.url.pathname.startsWith('/password-forget')
	) {
		console.log('HOOK | Forget Password Session:', new Date());
		const session = await passwordReset.session.get(event.cookies);
		if (!session) {
			return await resolve(event);
		}

		event.locals.passwordResetSession = session;
	}
	return await resolve(event);
};

export const handle = sequence(accountSession, passwordResetSession);
