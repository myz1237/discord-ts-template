import { config } from 'dotenv';

import { MyClient } from './structures/Client';
config();

const client = new MyClient();

client.start();

export default client;
