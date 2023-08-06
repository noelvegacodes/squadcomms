import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		database: 'buildstory',
		connectionString:
			'mysql://cw5ooxezwi4lng4iv7jg:pscale_pw_R2Pe4O2zEALQ0cAv5imW6zrtAavDrejv8WJHjZ6VzPM@aws.connect.psdb.cloud/buildstory?ssl={"rejectUnauthorized":true}'
	}
} satisfies Config;
