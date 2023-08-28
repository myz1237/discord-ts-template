import {
	ApplicationCommandType,
	AutocompleteInteraction,
	CommandInteractionOptionResolver,
	Interaction
} from 'discord.js';
import { sprintf } from 'sprintf-js';
import { myCache } from 'structures/Cache';
import { Event } from 'structures/Event';
import { ButtonCollectorCustomId, ExtendedButtonInteraction } from 'types/Button';
import { ExtendedCommandInteraction } from 'types/Command';
import {
	ExtendedMessageContextMenuInteraction,
	ExtendedUserContextMenuInteraction
} from 'types/ContextMenu';
import { ExtendedModalSubmitInteraction, ModalCollectorCustomId } from 'types/Modal';
import { ERROR_REPLY } from 'utils/const';
import { logger } from 'utils/logger';

import myClient from '..';

export default new Event('interactionCreate', async (interaction: Interaction) => {
	const errorInform = {
		userName: interaction?.user?.username,
		guildName: interaction?.guild?.name
	};

	if (!myCache.myHasAll()) {
		if (interaction.isAutocomplete()) {
			return interaction.respond([]);
		} else {
			return interaction.reply({
				content: 'Bot is initiating... Please try again later.',
				ephemeral: true
			});
		}
	}

	if (interaction.isCommand()) {
		const command = myClient.commands.get(interaction.commandName);

		if (!command) {
			return interaction.reply({
				content: 'You have used a non existent command',
				ephemeral: true
			});
		}
		try {
			switch (command.type) {
				case ApplicationCommandType.ChatInput: {
					await command.execute({
						client: myClient,
						interaction: interaction as ExtendedCommandInteraction,
						args: interaction.options as CommandInteractionOptionResolver
					});
					break;
				}
				case ApplicationCommandType.Message: {
					await command.execute({
						interaction: interaction as ExtendedMessageContextMenuInteraction
					});
					break;
				}
				case ApplicationCommandType.User: {
					await command.execute({
						interaction: interaction as ExtendedUserContextMenuInteraction
					});
					break;
				}
			}
		} catch (error) {
			let errorMsg: string;

			if (command.type === ApplicationCommandType.ChatInput) {
				errorMsg = sprintf(ERROR_REPLY.INTERACTION, {
					...errorInform,
					commandName: interaction.commandName,
					errorName: error?.name,
					errorMsg: error?.message,
					errorStack: error?.stack
				});
			} else {
				errorMsg = sprintf(ERROR_REPLY.MENU, {
					...errorInform,
					commandName: interaction.commandName,
					errorName: error?.name,
					errorMsg: error?.message,
					errorStack: error?.stack
				});
			}

			if (interaction.deferred) {
				logger.error(errorMsg);
				return interaction.followUp({
					content: ERROR_REPLY.COMMON
				});
			}
			if (!interaction.replied) {
				logger.error(errorMsg);
				interaction.reply({
					content: ERROR_REPLY.COMMON,
					ephemeral: true
				});
			}
		}
	}

	if (interaction.isButton()) {
		const button = myClient.buttons.get(interaction.customId);

		if (!button) {
			if (Object.keys(ButtonCollectorCustomId).includes(interaction.customId)) return;
			return interaction.reply({
				content: 'You have clicked a non existent button',
				ephemeral: true
			});
		}

		try {
			await button.execute({
				client: myClient,
				interaction: interaction as ExtendedButtonInteraction
			});
		} catch (error) {
			const errorMsg = sprintf(ERROR_REPLY.BUTTON, {
				...errorInform,
				customId: interaction.customId,
				errorName: error?.name,
				errorMsg: error?.message,
				errorStack: error?.stack
			});

			if (interaction.deferred) {
				logger.error(errorMsg);
				return interaction.followUp({
					content: ERROR_REPLY.COMMON
				});
			}
			if (!interaction.replied) {
				logger.error(errorMsg);
				interaction.reply({
					content: ERROR_REPLY.COMMON,
					ephemeral: true
				});
			}
		}
	}

	if (interaction.isModalSubmit()) {
		const modal = myClient.modals.get(interaction.customId);

		if (!modal) {
			if (Object.keys(ModalCollectorCustomId).includes(interaction.customId)) return;
			return interaction.reply({
				content: 'You have clicked a non existent modal',
				ephemeral: true
			});
		}

		try {
			await modal.execute({
				client: myClient,
				interaction: interaction as ExtendedModalSubmitInteraction
			});
		} catch (error) {
			const errorMsg = sprintf(ERROR_REPLY.MODAL, {
				...errorInform,
				customId: interaction.customId,
				errorName: error?.name,
				errorMsg: error?.message,
				errorStack: error?.stack
			});

			if (interaction.deferred) {
				logger.error(errorMsg);
				return interaction.followUp({
					content: ERROR_REPLY.COMMON
				});
			}
			if (!interaction.replied) {
				logger.error(errorMsg);
				interaction.reply({
					content: ERROR_REPLY.COMMON,
					ephemeral: true
				});
			}
		}
	}

	if (interaction.isAutocomplete()) {
		const auto = myClient.autos.get(interaction.commandName);

		if (!auto) {
			logger.error(`A non existent auto is triggered: ${interaction.commandName}`);
			return interaction.respond([]);
		}

		try {
			await auto.execute({
				client: myClient,
				interaction: interaction as AutocompleteInteraction
			});
		} catch (error) {
			return logger.error(
				sprintf(ERROR_REPLY.AUTO, {
					...errorInform,
					commandName: interaction.commandName,
					errorName: error?.name,
					errorMsg: error?.message,
					errorStack: error?.stack
				})
			);
		}
	}
});
