import { config } from 'dotenv';
import { DiscordBotError } from 'utils/error';
import { logger } from 'utils/logger';

import { MyClient } from './structures/Client';
config();

const myClient = new MyClient();

myClient.start().catch((error) => {
	logger.error('Error when starting client:', DiscordBotError.getError(error));
	process.exit(1);
});

export default myClient;
