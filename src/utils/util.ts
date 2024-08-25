import { Interaction } from 'discord.js';
import _ from 'lodash';
import { sprintf } from 'sprintf-js';

import {
	ErrorMessage,
	InteractionErrorMessageTemplate,
	InteractionErrorMessageTemplateType,
	InteractionType
} from './const';
import { logger } from './logger';

export const interactionEventErrorHandler = ({
	interaction,
	itnType,
	errMsgContents,
	error
}: {
	interaction: Interaction;
	itnType: InteractionType;
	errMsgContents: Pick<InteractionErrorMessageTemplateType, 'identity' | 'userName'>;
	error: Error;
}) => {
	const errorMessage = sprintf(InteractionErrorMessageTemplate[itnType], {
		...errMsgContents,
		errorName: error.name,
		errorMsg: error.message,
		errorStack: error.stack
	});

	if (interaction.isAutocomplete()) {
		return logger.error(errorMessage);
	}
	// Ensure the channel still exists, otherwise interaction reply or followUp will throw an error
	if (interaction.channel === null) {
		return logger.error(errorMessage);
	}

	if (interaction.deferred) {
		logger.error(errorMessage);
		return interaction.followUp({
			content: ErrorMessage.UnknownError,
			ephemeral: true
		});
	}
	if (!interaction.replied) {
		logger.error(errorMessage);
		return interaction.reply({
			content: ErrorMessage.UnknownError,
			ephemeral: true
		});
	}
};

export const isEnumValueDuplicated = (enum_A: string[], enum_B: string[]) =>
	_.intersection(enum_A, enum_B).length > 0;
