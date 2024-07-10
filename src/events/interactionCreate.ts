import { ApplicationCommandType, ChatInputCommandInteraction, Interaction } from 'discord.js';
import { Event } from 'structures/Event';
import { ExtendedAutocompleteInteraction } from 'types/Auto';
import { ButtonCollectorCustomIdEnum, ExtendedButtonInteraction } from 'types/Button';
import { ExtendedChatInputInteraction } from 'types/Command';
import {
	ExtendedMessageContextMenuInteraction,
	ExtendedUserContextMenuInteraction
} from 'types/ContextMenu';
import { SelectMenuCollectorCustomIdEnum } from 'types/Menu';
import { ExtendedModalSubmitInteraction, ModalAwaitSubmitCustomIdEnum } from 'types/Modal';
import { myCache } from 'utils/cache';
import { ErrorMessage } from 'utils/const';
import { DiscordBotError } from 'utils/error';
import { logger } from 'utils/logger';
import { interactionEventErrorHandler } from 'utils/util';

import myClient from '..';

export const event: Event = {
	name: 'interactionCreate',
	runOnce: false,
	run: async (interaction: Interaction) => {
		const isCacheReady = myCache.myHasAll();
		const isGuildAvailable = interaction.guild !== undefined;

		if (!isCacheReady || !isGuildAvailable) {
			const responseContent = !isCacheReady
				? ErrorMessage.BotInit
				: ErrorMessage.GuildUnavailable;

			return interaction.isAutocomplete()
				? interaction.respond([
						{
							name: responseContent,
							// A padding value
							value: '0'
						}
					])
				: interaction.reply({
						content: responseContent,
						ephemeral: true
					});
		}

		if (interaction.isButton()) {
			const button = myClient.buttons.get(interaction.customId);

			if (button === undefined) {
				// Forward the button interaction to the collector
				if (
					Object.values(ButtonCollectorCustomIdEnum).includes(
						interaction.customId as ButtonCollectorCustomIdEnum
					)
				)
					return;
				return interaction.reply({
					content: 'You have clicked a non-existent button',
					ephemeral: true
				});
			}

			try {
				await button.execute({
					client: myClient,
					interaction: interaction as ExtendedButtonInteraction
				});
			} catch (error: unknown) {
				return interactionEventErrorHandler({
					itnType: 'BUTTON',
					interaction,
					errMsgContents: {
						userName: interaction.user.username,
						identity: interaction.customId
					},
					error: DiscordBotError.getError(error)
				});
			}
		}

		if (interaction.isModalSubmit()) {
			const modal = myClient.modals.get(interaction.customId);

			if (modal === undefined) {
				// Forward the modal interaction to the collector
				if (
					Object.values(ModalAwaitSubmitCustomIdEnum).includes(
						interaction.customId as ModalAwaitSubmitCustomIdEnum
					)
				)
					return;
				return interaction.reply({
					content: 'You have clicked a non-existent modal',
					ephemeral: true
				});
			}

			try {
				await modal.execute({
					client: myClient,
					interaction: interaction as ExtendedModalSubmitInteraction
				});
			} catch (error: unknown) {
				return interactionEventErrorHandler({
					itnType: 'MODAL',
					interaction,
					errMsgContents: {
						userName: interaction.user.username,
						identity: interaction.customId
					},
					error: DiscordBotError.getError(error)
				});
			}
		}

		if (interaction.isAnySelectMenu()) {
			const selectMenu = myClient.selectMenus.get(interaction.customId);

			if (selectMenu === undefined) {
				// Forward the select menu interaction to the collector
				if (
					Object.values(SelectMenuCollectorCustomIdEnum).includes(
						interaction.customId as SelectMenuCollectorCustomIdEnum
					)
				)
					return;
				return interaction.reply({
					content: 'You have clicked a non-existent select menu',
					ephemeral: true
				});
			}

			try {
				await selectMenu.execute({
					client: myClient,
					interaction
				});
			} catch (error: unknown) {
				return interactionEventErrorHandler({
					itnType: 'MENU',
					interaction,
					errMsgContents: {
						userName: interaction.user.username,
						identity: interaction.customId
					},
					error: DiscordBotError.getError(error)
				});
			}
		}

		if (interaction.isCommand()) {
			const command = myClient.commands.get(interaction.commandName);

			if (!command) {
				return interaction.reply({
					content: 'You have used a non-existent command',
					ephemeral: true
				});
			}

			try {
				switch (command.type) {
					case ApplicationCommandType.ChatInput: {
						await command.execute({
							client: myClient,
							interaction: interaction as ExtendedChatInputInteraction,
							args: interaction.options as ChatInputCommandInteraction['options']
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
			} catch (error: unknown) {
				return interactionEventErrorHandler({
					itnType: 'COMMAND',
					interaction,
					errMsgContents: {
						userName: interaction.user.username,
						identity: interaction.commandName
					},
					error: DiscordBotError.getError(error)
				});
			}
		}

		if (interaction.isAutocomplete()) {
			const auto = myClient.autos.get(interaction.commandName);

			if (!auto) {
				logger.error(`A non-existent auto is triggered: ${interaction.commandName}`);
				return interaction.respond([]);
			}

			try {
				await auto.execute({
					client: myClient,
					interaction: interaction as ExtendedAutocompleteInteraction,
					args: interaction.options
				});
			} catch (error) {
				return interactionEventErrorHandler({
					itnType: 'AUTO',
					interaction,
					errMsgContents: {
						userName: interaction.user.username,
						identity: interaction.commandName
					},
					error: DiscordBotError.getError(error)
				});
			}
		}
	}
};

export default event;
