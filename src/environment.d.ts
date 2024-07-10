/* eslint-disable no-unused-vars */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			GUILDID: string;
			DATABASE_URL: string;
			MODE: 'dev' | 'prod';
			PREFIX: string;
		}
	}
}

export {};
