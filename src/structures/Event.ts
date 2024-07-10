import { ClientEvents } from 'discord.js';

export interface Event {
	name: keyof ClientEvents;
	runOnce: boolean;
	run: (...args: ClientEvents[keyof ClientEvents]) => unknown;
}
