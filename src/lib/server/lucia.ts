// lucia.ts
import { lucia } from 'lucia';
import { planetscale } from '@lucia-auth/adapter-mysql';
import { connect } from '@planetscale/database';
import { dev } from '$app/environment';
import {
	PRIVATE_DATABASE_HOST,
	PRIVATE_DATABASE_USERNAME,
	PRIVATE_DATABASE_PASSWORD
} from '$env/static/private';
import { sveltekit } from 'lucia/middleware';
// expect error

const connection = connect({
	host: PRIVATE_DATABASE_HOST,
	username: PRIVATE_DATABASE_USERNAME,
	password: PRIVATE_DATABASE_PASSWORD
});

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: planetscale(connection, {
		user: 'users',
		key: 'user_keys',
		session: 'user_sessions'
	}),
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			email: data.email,
			handle: data.handle,
			name: data.name
		};
	}
});

export type Auth = typeof auth;
