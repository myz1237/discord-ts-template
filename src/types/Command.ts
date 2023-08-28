/* eslint-disable no-unused-vars */
import {
	ApplicationCommandType,
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
	PermissionResolvable
} from 'discord.js';
import { MyClient } from 'structures/Client';

export interface ExtendedCommandInteraction extends CommandInteraction {
	member: GuildMember;
}

interface CommandRunOptions {
	client: MyClient;
	interaction: ExtendedCommandInteraction;
	args: CommandInteractionOptionResolver;
}

type RunFunction = (options: CommandRunOptions) => any;
export enum CommandNameEnum {
	Test = 'test'
}
export type CommandType = {
	name: CommandNameEnum;
	userPermissions?: PermissionResolvable[];
	execute: RunFunction;
	type: ApplicationCommandType.ChatInput;
} & ChatInputApplicationCommandData;
