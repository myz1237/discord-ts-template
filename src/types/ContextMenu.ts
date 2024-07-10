import {
	ApplicationCommandType,
	Guild,
	GuildMember,
	Message,
	MessageApplicationCommandData,
	MessageContextMenuCommandInteraction,
	PermissionResolvable,
	UserApplicationCommandData,
	UserContextMenuCommandInteraction
} from 'discord.js';

export interface ExtendedUserContextMenuInteraction extends UserContextMenuCommandInteraction {
	targetMember: GuildMember;
	member: GuildMember;
	// will check it at InteractionCreate event, ensuring guild is defined
	guild: Guild;
}

export interface ExtendedMessageContextMenuInteraction
	extends MessageContextMenuCommandInteraction {
	targetMessage: Message;
	member: GuildMember;
	// will check it at InteractionCreate event, ensuring guild is defined
	guild: Guild;
}

interface MessageContextMenuCommandRunOption {
	interaction: ExtendedMessageContextMenuInteraction;
}

interface UserContextMenuCommandRunOption {
	interaction: ExtendedUserContextMenuInteraction;
}

type MessageContextMenuRunFunction = (options: MessageContextMenuCommandRunOption) => unknown;
type UserContextMenuRunFunction = (options: UserContextMenuCommandRunOption) => unknown;

export enum ContextMenuNameEnum {
	test = 'test'
}

export type UserContextMenuType = {
	userPermissions?: PermissionResolvable[];
	execute: UserContextMenuRunFunction;
	name: ContextMenuNameEnum;
	type: ApplicationCommandType.User;
} & UserApplicationCommandData;

export type MessageContextMenuType = {
	userPermissions?: PermissionResolvable[];
	execute: MessageContextMenuRunFunction;
	name: ContextMenuNameEnum;
	type: ApplicationCommandType.Message;
} & MessageApplicationCommandData;
