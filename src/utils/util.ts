import { Guild } from 'discord.js';
import { sprintf } from 'sprintf-js';
import { CommandNameEnum } from 'types/Command';
import { ContextMenuNameEnum } from 'types/ContextMenu';

import { ERROR_REPLY } from './const';

export function getErrorReply(errorInform: {
	commandName: string;
	subCommandName?: string;
	errorMessage: string;
}) {
	const { commandName, subCommandName, errorMessage } = errorInform;

	if (subCommandName) {
		return sprintf(ERROR_REPLY.GRAPHQL, {
			action: `${commandName} ${subCommandName}`,
			errorMessage: `\`${errorMessage}\``
		});
	} else {
		return sprintf(ERROR_REPLY.GRAPHQL, {
			action: `${commandName}`,
			errorMessage: `\`${errorMessage}\``
		});
	}
}

export function fetchCommandId(commandName: CommandNameEnum | ContextMenuNameEnum, guild: Guild) {
	if (process.env.MODE === 'dev') {
		return guild.commands.cache.filter((cmd) => cmd.name === commandName).first().id;
	} else {
		return guild.client.application.commands.cache
			.filter((cmd) => cmd.name === commandName)
			.first().id;
	}
}
