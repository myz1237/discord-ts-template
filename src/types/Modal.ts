/* eslint-disable no-unused-vars */
import { GuildMember, ModalSubmitInteraction } from 'discord.js';
import { MyClient } from 'structures/Client';

export interface ExtendedModalSubmitInteraction extends ModalSubmitInteraction {
	member: GuildMember;
}

interface ModalRunOptions {
	client: MyClient;
	interaction: ExtendedModalSubmitInteraction;
}

type RunFunction = (options: ModalRunOptions) => any;

export enum ModalCustomId {
	Test = 'test'
}
export enum ModalCollectorCustomId {}
export interface ModalType {
	customId: ModalCustomId;
	execute: RunFunction;
}
