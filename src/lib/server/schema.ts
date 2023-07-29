import type { InferModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { timestamp, pgTable, serial, varchar, integer, text } from 'drizzle-orm/pg-core';

export const AccountsTable = pgTable('accounts', {
	id: serial('id').primaryKey().notNull(),
	handle: varchar('handle', { length: 50 }).notNull().unique(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	hashedPassword: varchar('hashed_password', { length: 72 }).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const UsersTable = pgTable('users', {
	id: serial('id').primaryKey().notNull(),
	accountId: integer('account_id')
		.notNull()
		.references(() => AccountsTable.id),
	displayName: varchar('display_name').notNull(),
	avatarUrl: text('avatar_url'),
	bannerUrl: text('banner_url'),
	bio: varchar('bio', { length: 500 }),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const UserRelations = relations(UsersTable, ({ one, many }) => ({
	account: one(AccountsTable),
	posts: many(PostsTable)
}));

export const PostsTable = pgTable('posts', {
	id: serial('id').primaryKey().notNull(),
	text: text('text'),
	authorId: integer('author_id')
		.notNull()
		.references(() => UsersTable.id)
});

export const PostsRelations = relations(PostsTable, ({ one, many }) => ({
	author: one(UsersTable, {
		fields: [PostsTable.authorId],
		references: [UsersTable.id]
	}),
	comments: many(CommentsTable)
}));

export const CommentsTable = pgTable('comments', {
	id: serial('id').primaryKey(),
	text: text('text'),
	authorId: integer('author_id').references(() => UsersTable.id),
	postId: integer('post_id').references(() => PostsTable.id)
});

export const CommentsRelations = relations(CommentsTable, ({ one }) => ({
	post: one(PostsTable, {
		fields: [CommentsTable.postId],
		references: [PostsTable.id]
	})
}));

export type NewUserType = InferModel<typeof UsersTable, 'insert'>;
export type UserType = InferModel<typeof UsersTable, 'select'>;
export type AccountType = InferModel<typeof AccountsTable, 'select'>;
