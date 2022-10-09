import { sprintf } from 'sprintf-js';
import { ERROR_REPLY, NUMBER } from './const';
import _ from 'lodash';
import { TimeOutError } from './error';
export interface awaitWrapType<T> {
	result: T | null;
	error: any | null;
}

export async function awaitWrap<T>(promise: Promise<T>): Promise<awaitWrapType<T>> {
	return promise
		.then((data) => {
			return {
				result: data,
				error: null
			};
		})
		.catch((error) => {
			return {
				result: null,
				error: error?.message
			};
		});
}

export async function awaitWrapWithTimeout<T>(
	promise: Promise<T>,
	ms = NUMBER.AWAIT_TIMEOUT
): Promise<awaitWrapType<T>> {
	const timeout = new Promise<never>((_, reject) => {
		setTimeout(() => {
			reject(new TimeOutError);
		}, ms);
	});
	return Promise.race([promise, timeout])
		.then((data) => {
			return {
				result: data,
				error: null
			};
		})
		.catch((error) => {
			return {
				result: null,
				error: error
			};
		});
}

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