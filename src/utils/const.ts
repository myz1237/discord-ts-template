export type InteractionType = 'COMMAND' | 'BUTTON' | 'AUTO' | 'MODAL' | 'MENU' | 'MESSAGE';
export type InteractionErrorMessageTemplateType = {
	userName: string;
	errorName: string;
	errorMsg: string;
	errorStack: string;
	identity: string;
};

export const NUMBER = {
	AWAIT_TIMEOUT: 15 * 1000,
	AUTOCOMPLETE_OPTION_LENGTH: 25
};

export const ErrorMessage = {
	BotInit: 'Bot is initializing, please try again later.',
	GuildUnavailable: 'Sorry, current guild is available now. Please try again later.',
	UnknownError: 'Unknown Error, please report this to the admin'
};

export const InteractionErrorMessageTemplate: Record<InteractionType, string> = {
	COMMAND:
		'User: %(userName)s Error: %(errorName)s occurs when executing %(identity)s command. ErrorMsg: %(errorMsg)s Stack: %(errorStack)s',
	BUTTON: 'User: %(userName)s Error: %(errorName)s occurs when interacting %(identity)s button. ErrorMsg: %(errorMsg)s Stack: %(errorStack)s',
	AUTO: 'User: %(userName)s Error: %(errorName)s occurs when interacting %(identity)s auto. ErrorMsg: %(errorMsg)s Stack: %(errorStack)s',
	MODAL: 'User: %(userName)s Error: %(errorName)s occurs when interacting %(identity)s modal. ErrorMsg: %(errorMsg)s Stack: %(errorStack)s',
	MENU: 'User: %(userName)s Error: %(errorName)s occurs when executing %(identity)s menu. ErrorMsg: %(errorMsg)s Stack: %(errorStack)s',
	MESSAGE:
		'User: %(userName)s Error: %(errorName)s occurs when executing message command. Message Content: %(identity)s ErrorMsg: %(errorMsg)s Stack: %(errorStack)s'
};
