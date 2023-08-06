CREATE TABLE `email_verification_tokens` (
	`id` varchar(127) NOT NULL,
	`expires` bigint NOT NULL,
	`user_id` varchar(31) NOT NULL,
	CONSTRAINT `email_verification_tokens_expires` PRIMARY KEY(`expires`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` varchar(127) NOT NULL,
	`expires` bigint NOT NULL,
	`user_id` varchar(31) NOT NULL,
	CONSTRAINT `password_reset_tokens_expires` PRIMARY KEY(`expires`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` char(21) NOT NULL,
	`text` varchar(500) NOT NULL,
	`user_id` varchar(31) NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_keys` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `user_keys_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` varchar(127) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	CONSTRAINT `user_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(31) NOT NULL,
	`email` varchar(100) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`name` varchar(32) NOT NULL,
	`handle` varchar(16) NOT NULL,
	`bio` varchar(300),
	`location` varchar(30),
	`website` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_handle_unique` UNIQUE(`handle`)
);
