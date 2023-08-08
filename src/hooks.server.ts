import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const entry: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};

export const protectedRoutes: Handle = async ({ event, resolve }) => {
	const route = event.route.id as string;

	if (route.startsWith('/(app)')) {
		const session = await event.locals.auth.validate();
		if (!session || !session.user.email_verified) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: `/signin` }
			});
		}
		event.locals.session = session;
	}

	if (route === '/') {
		const session = await event.locals.auth.validate();
		if (session?.user.email_verified) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: `/home` }
			});
		}
	}

	return await resolve(event);
};

export const handle = sequence(entry, protectedRoutes);
