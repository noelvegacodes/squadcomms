import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		database: 'buildstory',
		connectionString:
			'mysql://pm9z1c76z621x73o17sl:pscale_pw_WVW5CQBdLjTIbg9d38X0xonBreUU5NIWkwpK4yHL6gt@aws.connect.psdb.cloud/buildstory?ssl={"rejectUnauthorized":true}'
	}
} satisfies Config;
