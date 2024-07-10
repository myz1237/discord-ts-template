import type { AutocompleteInteraction, Guild } from 'discord.js';
import { MyClient } from 'structures/Client';

import { CommandNameEnum } from './Command';

export interface ExtendedAutocompleteInteraction extends AutocompleteInteraction {
	// will check it at InteractionCreate event, ensuring guild is defined
	guild: Guild;
}

interface AutoRunOptions {
	client: MyClient;
	interaction: ExtendedAutocompleteInteraction;
	args: AutocompleteInteraction['options'];
}

type RunFunction = (options: AutoRunOptions) => unknown;
export interface AutoType {
	correspondingCommandName: CommandNameEnum;
	execute: RunFunction;
}
