import { ButtonInteraction, Guild, GuildMember } from 'discord.js';
import { MyClient } from 'structures/Client';

export interface ExtendedButtonInteraction extends ButtonInteraction {
	member: GuildMember;
	customId: ButtonCustomIdEnum;
	// will check it at InteractionCreate event, ensuring guild is defined
	guild: Guild;
}

interface ButtonRunOptions {
	client: MyClient;
	interaction: ExtendedButtonInteraction;
}

type RunFunction = (options: ButtonRunOptions) => unknown;
export enum ButtonCustomIdEnum {
	test = 'test'
}

export enum ButtonCollectorCustomIdEnum {
	test = 'test'
}

export interface ButtonType {
	customIds: Array<ButtonCustomIdEnum>;
	execute: RunFunction;
}
