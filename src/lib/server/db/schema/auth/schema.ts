import { bigint, int, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
	'users',
	{
		id: varchar('id', { length: 31 }).primaryKey().notNull(),
		email: varchar('email', { length: 100 }).unique().notNull(),
		handle: varchar('handle', { length: 16 }).unique(),
		name: varchar('name', { length: 256 }).notNull()
	},
	(users) => ({
		emailIndex: uniqueIndex('email_idx').on(users.email),
		handleIndex: uniqueIndex('name_idx').on(users.handle)
	})
);

export const userKeys = mysqlTable('user_keys', {
	id: varchar('id', { length: 255 }).primaryKey().notNull(),
	user_id: varchar('user_id', { length: 15 }).notNull(),
	hashedPassword: varchar('hashed_password', { length: 255 })
});

export const userSessions = mysqlTable('user_sessions', {
	id: varchar('id', { length: 127 }).primaryKey().notNull(),
	user_id: varchar('user_id', { length: 15 }).notNull(),
	activeExpires: bigint('active_expires', { mode: 'bigint' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'bigint' }).notNull()
});
