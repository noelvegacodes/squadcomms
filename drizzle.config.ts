import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		database: 'buildstory',
		connectionString:
	}
} satisfies Config;
