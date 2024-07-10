import util from 'util';

type ErrorWithMessageAndStack = Error & {
	message: string;
	stack?: string;
};

export class DiscordBotError extends Error {
	protected constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}

	public static new({ message }: { message: string }) {
		return new DiscordBotError(message);
	}

	private static isErrorWithMessageAndStack(error: unknown): error is ErrorWithMessageAndStack {
		return (
			typeof error === 'object' &&
			error !== null &&
			'message' in error &&
			typeof (error as Record<string, unknown>).message === 'string'
		);
	}

	private static toErrorWithMessageAndStack(maybeError: unknown): ErrorWithMessageAndStack {
		if (DiscordBotError.isErrorWithMessageAndStack(maybeError)) return maybeError;

		try {
			return new Error(util.format(maybeError));
		} catch {
			return new Error(String(maybeError));
		}
	}

	public static getError(error: unknown) {
		return DiscordBotError.toErrorWithMessageAndStack(error);
	}
	public static getErrorName(error: unknown) {
		return DiscordBotError.toErrorWithMessageAndStack(error).name;
	}
	public static getErrorMessage(error: unknown) {
		return DiscordBotError.toErrorWithMessageAndStack(error).message;
	}
	public static getErrorStack(error: unknown) {
		return DiscordBotError.toErrorWithMessageAndStack(error).stack;
	}
}