import { Message } from 'discord.js';
import myClient from 'index';
import { sprintf } from 'sprintf-js';
import { Event } from 'structures/Event';
import { MessageCommandRegExp } from 'types/MessageCommand';
import { myCache } from 'utils/cache';
import { InteractionErrorMessageTemplate } from 'utils/const';
import { DiscordBotError } from 'utils/error';
import { logger } from 'utils/logger';

export const event: Event = {
	name: 'messageCreate',
	runOnce: false,
	run: async (message: Message<true>) => {
		const { content, author } = message;

		if (!myCache.myHasAll()) return;
		const commandMatch = content.match(MessageCommandRegExp);

		if (commandMatch !== null) {
			const commandName = commandMatch[1].toLowerCase();
			const messageCommand = myClient.messageCommands.get(commandName);

			if (messageCommand === undefined) {
				return message.reply({
					content: 'You have used a non-existent message command.'
				});
			}

			try {
				await messageCommand.execute({
					client: myClient,
					message,
					param: commandMatch[2]
				});
			} catch (error: unknown) {
				const structuredError = DiscordBotError.getError(error);

				logger.error(
					sprintf(InteractionErrorMessageTemplate.MESSAGE, {
						userName:
							message.webhookId !== null
								? `WebhookId ${message.webhookId}`
								: author.username,
						identity: message.cleanContent,
						errorName: structuredError.name,
						errorMsg: structuredError.message,
						errorStack: structuredError.stack
					})
				);
			}
		}
	}
};
