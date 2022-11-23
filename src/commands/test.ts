import { ApplicationCommandType } from 'discord.js';

import { Command } from '../structures/Command';

export default new Command({
	name: '',
	description: '',
	type: ApplicationCommandType.ChatInput,
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'Test'
		});
	}
});
