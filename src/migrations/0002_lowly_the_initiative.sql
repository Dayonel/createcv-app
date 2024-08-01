CREATE TABLE `resume` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`json` text NOT NULL,
	`userId` text NOT NULL,
	`creationDate` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
