import { drizzle } from 'drizzle-orm/planetscale-serverless';
import * as schema from '$lib/server/db/schema';
import { connect } from '@planetscale/database';
import {
	PRIVATE_DATABASE_HOST,
	PRIVATE_DATABASE_USERNAME,
	PRIVATE_DATABASE_PASSWORD
} from '$env/static/private';

const connection = connect({
	host: PRIVATE_DATABASE_HOST,
	username: PRIVATE_DATABASE_USERNAME,
	password: PRIVATE_DATABASE_PASSWORD
});

export const db = drizzle(connection, { schema });
