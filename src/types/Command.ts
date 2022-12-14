import {
	ApplicationCommandType,
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
	PermissionResolvable
} from 'discord.js';

import { MyClient } from '../structures/Client';

export interface ExtendedCommandInteration extends CommandInteraction {
	member: GuildMember;
}

interface CommandRunOptions {
	client: MyClient;
	interaction: ExtendedCommandInteration;
	args: CommandInteractionOptionResolver;
}

type RunFunction = (options: CommandRunOptions) => any;
export type CommandNameEnum = '';
export type CommandType = {
	name: CommandNameEnum;
	userPermissions?: PermissionResolvable[];
	execute: RunFunction;
	type: ApplicationCommandType.ChatInput;
} & ChatInputApplicationCommandData;
