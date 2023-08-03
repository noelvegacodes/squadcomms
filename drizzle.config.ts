import type { Config } from 'drizzle-kit';
import { PRIVATE_DATABASE_URL } from '$env/static/private';

export default {
	schema: './src/lib/server/db/schema/auth/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		database: 'buildstory',
		connectionString: PRIVATE_DATABASE_URL
	}
} satisfies Config;
