import { AsciiTable3 } from 'ascii-table3';
import {
	ChatInputApplicationCommandData,
	Client,
	Collection,
	GatewayIntentBits,
	MessageApplicationCommandData,
	UserApplicationCommandData
} from 'discord.js';
import glob from 'glob';
import path from 'path';
import prismaClient from 'prisma/index';
import { AutoType } from 'types/Auto';
import { ButtonCollectorCustomIdEnum, ButtonCustomIdEnum, ButtonType } from 'types/Button';
import { CommandType } from 'types/Command';
import { RegisterCommandsOptions } from 'types/CommandRegister';
import { MessageContextMenuType, UserContextMenuType } from 'types/ContextMenu';
import {
	SelectMenuCollectorCustomIdEnum,
	SelectMenuCustomIdEnum,
	SelectMenuType
} from 'types/Menu';
import { MessageCommandType } from 'types/MessageCommand';
import { ModalAwaitSubmitCustomIdEnum, ModalCustomIdEnum, ModalType } from 'types/Modal';
import { promisify } from 'util';
import { staticConfig } from 'utils/config';
import { DiscordBotError } from 'utils/error';
import { logger } from 'utils/logger';
import { isEnumValueDuplicated } from 'utils/util';

import { Event } from './Event';

const globPromise = promisify(glob);

export class MyClient extends Client {
	public commands: Collection<
		string,
		CommandType | MessageContextMenuType | UserContextMenuType
	> = new Collection();
	public allCommands: Array<
		ChatInputApplicationCommandData | MessageApplicationCommandData | UserApplicationCommandData
	> = [];
	public buttons: Collection<string, ButtonType> = new Collection();
	public modals: Collection<string, ModalType> = new Collection();
	public autos: Collection<string, AutoType> = new Collection();
	public selectMenus: Collection<string, SelectMenuType> = new Collection();
	public messageCommands = new Collection<string, MessageCommandType>();

	private table: AsciiTable3;

	public constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.GuildVoiceStates
			]
		});

		this.table = new AsciiTable3('Cache Loading ...').setHeading('Data', 'Status');
		this.table.setHeading('Data', 'Status');
	}

	public async start() {
		this.customIdCheck();
		await this.loadFiles();
		await this.loadCache();
		await this.login(staticConfig.discordToken);
	}

	private async registerCommands({ guildId, commands }: RegisterCommandsOptions) {
		if (guildId !== undefined) {
			// Register the commands in this guild
			await this.guilds.cache.get(guildId)?.commands.set(commands);
			logger.info('Commands are set locally.');
		} else {
			// Register the commands in this application, covering all guilds
			// this.application.commands?.set([]);
			await this.application?.commands?.set(commands);
			logger.info('Commands are set globally.');
		}
	}

	private async importDefaultModule<T>(filePath: string): Promise<T> {
		const importedModule = (await import(filePath)) as { default?: T };

		if (importedModule.default === undefined) {
			throw DiscordBotError.new({
				message: `Module ${filePath} does not have a default export`
			});
		}

		return importedModule.default;
	}

	// Check if the customId is duplicated
	private customIdCheck() {
		if (
			isEnumValueDuplicated(
				Object.values(ButtonCustomIdEnum),
				Object.values(ButtonCollectorCustomIdEnum)
			)
		) {
			throw DiscordBotError.new({
				message: 'ButtonCustomIdEnum and ButtonCollectorCustomIdEnum have duplicated values'
			});
		}

		if (
			isEnumValueDuplicated(
				Object.values(SelectMenuCustomIdEnum),
				Object.values(SelectMenuCollectorCustomIdEnum)
			)
		) {
			throw DiscordBotError.new({
				message:
					'SelectMenuCustomIdEnum and SelectMenuCollectorCustomIdEnum have duplicated values'
			});
		}

		if (
			isEnumValueDuplicated(
				Object.values(ModalCustomIdEnum),
				Object.values(ModalAwaitSubmitCustomIdEnum)
			)
		) {
			throw DiscordBotError.new({
				message: 'ModalCustomIdEnum and ModalAwaitSubmitCustomIdEnum have duplicated values'
			});
		}
	}

	private async loadFiles() {
		// Load Commands
		const commandFiles = await globPromise(
			path.join(__dirname, '..', 'commands', '*{.ts,.js}')
		);

		for (const filePath of commandFiles) {
			const command = await this.importDefaultModule<CommandType>(filePath);

			this.commands.set(command.name, command);
			this.allCommands.push(command);
		}

		const menuFiles = await globPromise(
			path.join(__dirname, '..', 'contextmenus', '*{.ts,.js}')
		);

		for (const filePath of menuFiles) {
			const menu = await this.importDefaultModule<
				MessageContextMenuType | UserContextMenuType
			>(filePath);

			this.commands.set(menu.name, menu);
			this.allCommands.push(menu);
		}

		const messageCommandFiles = await globPromise(
			path.join(__dirname, '..', 'messageCommands', '*{.ts,.js}')
		);

		for (const filePath of messageCommandFiles) {
			const messageCommand: MessageCommandType = await this.importDefaultModule(filePath);

			this.messageCommands.set(messageCommand.name, messageCommand);
		}

		const buttonFiles = await globPromise(path.join(__dirname, '..', 'buttons', '*{.ts,.js}'));

		for (const filePath of buttonFiles) {
			const button = await this.importDefaultModule<ButtonType>(filePath);

			button.customIds.forEach((customId) => {
				this.buttons.set(customId, button);
			});
		}

		const modalFiles = await globPromise(path.join(__dirname, '..', 'modals', '*{.ts,.js}'));

		for (const filePath of modalFiles) {
			const modal = await this.importDefaultModule<ModalType>(filePath);

			modal.customIds.forEach((customId) => {
				this.modals.set(customId, modal);
			});
		}

		const autoFiles = await globPromise(
			path.join(__dirname, '..', 'autocompletes', '*{.ts,.js}')
		);

		for (const filePath of autoFiles) {
			const auto = await this.importDefaultModule<AutoType>(filePath);

			this.autos.set(auto.correspondingCommandName, auto);
		}

		const selectMenuFiles = await globPromise(
			path.join(__dirname, '..', 'menus', '*{.ts,.js}')
		);

		for (const filePath of selectMenuFiles) {
			const menu = await this.importDefaultModule<SelectMenuType>(filePath);

			this.selectMenus.set(menu.customId, menu);
		}

		// Load Events
		const eventFiles = await globPromise(path.join(__dirname, '..', 'events', '*{.ts,.js}'));

		for (const filePath of eventFiles) {
			const event = await this.importDefaultModule<Event>(filePath);

			if (event.runOnce) {
				this.once(event.name, (...args) => {
					event.run(...args);
				});
			} else {
				this.on(event.name, (...args) => {
					event.run(...args);
				});
			}
		}
	}

	private async loadCache() {
		await prismaClient.$connect();
		logger.info(`\n${this.table.toString()}`);
	}

	public async ready() {
		if (staticConfig.mode === 'dev') {
			await this.registerCommands({
				guildId: staticConfig.guildId,
				commands: this.allCommands
			});
		} else {
			await this.registerCommands({
				commands: this.allCommands
			});
		}
	}
}
