import type { Config } from 'drizzle-kit';

const DATABASE_URL =
	'mysql://1exp28z15btgiujsyr58:pscale_pw_fMa3khbCdxMHRwJcpKSjqwUIWjGl3lWRmSVyCrNIFBf@aws.connect.psdb.cloud/buildstory?ssl={"rejectUnauthorized":true}';
export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		database: 'buildstory',
		connectionString: DATABASE_URL
	}
} satisfies Config;
