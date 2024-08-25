import { Message } from 'discord.js';
import { MyClient } from 'structures/Client';
import { staticConfig } from 'utils/config';

interface MessageRunOptions {
	client: MyClient;
	message: Message;
	// One Param Only
	param?: string;
}

type RunFunction = (options: MessageRunOptions) => unknown;

export const MessageCommandRegExp = new RegExp(
	`^${staticConfig.msgCmdPrefix}\\s+([a-zA-Z]+)(?:\\s+([A-Za-z0-9_.:/-]+))?`,
	'i'
);

export enum MessageCommandEnum {
	test = 'test'
}

export type MessageCommandType = {
	name: MessageCommandEnum;
	roles: string[];
	execute: RunFunction;
};
