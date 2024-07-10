import myClient from 'index';
import { Event } from 'structures/Event';

export const event: Event = {
	name: 'ready',
	runOnce: true,
	run: async () => {
		await myClient.ready();
	}
};
