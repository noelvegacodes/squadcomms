import type { Config } from 'drizzle-kit';
// import {
// 	PRIVATE_DATABASE_HOST,
// 	PRIVATE_DATABASE_USERNAME,
// 	PRIVATE_DATABASE_PASSWORD
// } from '$env/static/private';

export default {
	schema: './src/lib/server/db/schema/auth/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		database: 'buildstory',
		connectionString:
			'mysql://xp3387wjob89y0rs0k0f:pscale_pw_aYXKzaahO1eLJJEVprQ24nx1s8HH6Ru44A7cv3DuoSb@aws.connect.psdb.cloud/buildstory?ssl={"rejectUnauthorized":true}'
	}
} satisfies Config;
