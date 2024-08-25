import { config as dotEnvConfig } from 'dotenv';
import { isEmpty } from 'lodash';

import { DiscordBotError } from './error';

interface StaticConfig {
	discordToken: string;
	guildId: string;
	mode: 'dev' | 'prod';
	msgCmdPrefix: string;
}

dotEnvConfig();

const validateConfig = (): StaticConfig => {
	const inValidatedConfig: StaticConfig = {
		discordToken: process.env.TOKEN,
		guildId: process.env.GUILDID,
		mode: process.env.MODE,
		msgCmdPrefix: process.env.PREFIX
	};

	for (const [key, value] of Object.entries(inValidatedConfig)) {
		if (isEmpty(value)) {
			throw DiscordBotError.new({ message: `Missing environment variable: ${key}` });
		}
	}
	return inValidatedConfig;
};

export const staticConfig = validateConfig();
