import { Guild, GuildMember, ModalSubmitInteraction } from 'discord.js';
import { MyClient } from 'structures/Client';

export interface ExtendedModalSubmitInteraction extends ModalSubmitInteraction {
	member: GuildMember;
	// will check it at InteractionCreate event, ensuring guild is defined
	guild: Guild;
	customId: ModalCustomIdEnum;
}

interface ModalRunOptions {
	client: MyClient;
	interaction: ExtendedModalSubmitInteraction;
}

type RunFunction = (options: ModalRunOptions) => unknown;

export enum ModalCustomIdEnum {
	test = 'test'
}

export enum ModalAwaitSubmitCustomIdEnum {
	test = 'test'
}

export enum TextInputCustomIdEnum {
	test = 'test'
}

export interface ModalType {
	customIds: ModalCustomIdEnum[];
	execute: RunFunction;
}
