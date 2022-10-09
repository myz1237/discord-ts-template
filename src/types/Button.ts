import { ButtonInteraction, GuildMember, Message } from 'discord.js';
import { MyClient } from '../structures/Client';

export interface ExtendedButtonInteraction extends ButtonInteraction {
	member: GuildMember;
	message: Message
}

interface ButtonRunOptions {
	client: MyClient;
	interaction: ExtendedButtonInteraction;
}

type RunFunction = (options: ButtonRunOptions) => any;
type buttonCustomId = '';
export interface ButtonType {
	customIds: Array<buttonCustomId>;
	execute: RunFunction;
}
