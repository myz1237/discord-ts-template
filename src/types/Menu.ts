import { AnySelectMenuInteraction } from 'discord.js';
import { MyClient } from 'structures/Client';

interface SelectMenuRunOptions {
	client: MyClient;
	interaction: AnySelectMenuInteraction;
}

type RunFunction = (options: SelectMenuRunOptions) => unknown;

export enum SelectMenuCustomIdEnum {
	test = 'test'
}
export enum SelectMenuCollectorCustomIdEnum {
	test = 'test'
}

export interface SelectMenuType {
	customId: SelectMenuCustomIdEnum;
	execute: RunFunction;
}
