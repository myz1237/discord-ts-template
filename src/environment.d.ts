/* eslint-disable no-unused-vars */
import { CommandNameEnum } from './types/Command';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			GUILDID: string;
			DATABASE_URL: string;
			MODE: 'dev' | 'prod';
		}
	}
}

export {};
