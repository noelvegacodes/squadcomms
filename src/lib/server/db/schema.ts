import { relations } from 'drizzle-orm';
import { bigint, boolean, char, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
	id: varchar('id', { length: 31 }).primaryKey().notNull(),
	email: varchar('email', { length: 100 }).unique().notNull(),
	email_verified: boolean('email_verified').default(false).notNull(),
	name: varchar('name', { length: 32 }).notNull(),
	handle: varchar('handle', { length: 16 }).unique().notNull(),
	bio: varchar('bio', { length: 300 }),
	location: varchar('location', { length: 30 }),
	website: varchar('website', { length: 100 }),
	avatar: varchar('avatar', { length: 300 }),
	banner: varchar('banner', { length: 3000 }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// TODO: support images, polls, likes, comments, sharing
export const posts = mysqlTable('posts', {
	id: char('id', { length: 21 }).notNull().primaryKey(),
	text: varchar('text', { length: 500 }).notNull(),
	user_id: varchar('user_id', { length: 31 }).notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts)
}));

export const postRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.id],
		references: [users.id]
	})
}));

export const userKeys = mysqlTable('user_keys', {
	id: varchar('id', { length: 255 }).primaryKey().notNull(),
	user_id: varchar('user_id', { length: 15 }).notNull(),
	hashedPassword: varchar('hashed_password', { length: 255 })
});

export const userSessions = mysqlTable('user_sessions', {
	id: varchar('id', { length: 127 }).primaryKey().notNull(),
	user_id: varchar('user_id', { length: 15 }).notNull(),
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull()
});

export const emailVerificationTokens = mysqlTable('email_verification_tokens', {
	id: varchar('id', { length: 127 }).notNull(),
	expires: bigint('expires', { mode: 'number' }).notNull().primaryKey(),
	user_id: varchar('user_id', { length: 31 }).notNull()
});

export const passwordResetTokens = mysqlTable('password_reset_tokens', {
	id: varchar('id', { length: 127 }).notNull(),
	expires: bigint('expires', { mode: 'number' }).notNull().primaryKey(),
	user_id: varchar('user_id', { length: 31 }).notNull()
});
