// src/hooks.server.ts
import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	console.log('HOOK:', event.route, new Date());
	const protectedRoutes = ['/(app)'];
	event.locals.auth = auth.handleRequest(event);
	const session = await auth.handleRequest(event).validate();
	const route = event.route.id;

	if (!session) {
		if (!route) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: `/` }
			});
		}
		if (protectedRoutes.includes(route)) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: `/signin` }
			});
		}
	}

	if (session) {
		event.locals.session = session;
		if (!session.user.email_verified) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: '/email-verification' }
			});
		}
		if (route === '/' || route?.startsWith('/(auth)')) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: `/${session.user.handle}` }
			});
		}
	}
	return await resolve(event);
};
