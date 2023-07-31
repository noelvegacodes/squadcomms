import { drizzle } from 'drizzle-orm/neon-http';
import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { neon, neonConfig } from '@neondatabase/serverless';
const sql = neon(PRIVATE_DATABASE_URL);
neonConfig.fetchConnectionCache = true;
export const db = drizzle(sql);
