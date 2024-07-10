import {
	ApplicationCommandType,
	ChatInputApplicationCommandData,
	ChatInputCommandInteraction,
	Guild,
	GuildMember,
	PermissionResolvable
} from 'discord.js';
import { MyClient } from 'structures/Client';

export interface ExtendedChatInputInteraction extends ChatInputCommandInteraction {
	member: GuildMember;
	// will check it at InteractionCreate event, ensuring guild is defined
	guild: Guild;
}

interface CommandRunOptions {
	client: MyClient;
	interaction: ExtendedChatInputInteraction;
	args: ChatInputCommandInteraction['options'];
}

type RunFunction = (options: CommandRunOptions) => unknown;

export enum CommandNameEnum {
	test = 'test'
}

export type CommandType = {
	name: CommandNameEnum;
	userPermissions?: PermissionResolvable[];
	execute: RunFunction;
	type: ApplicationCommandType.ChatInput;
} & ChatInputApplicationCommandData;
