import { ApplicationCommandType } from 'discord.js';
import { Command } from 'structures/Command';
import { CommandNameEnum } from 'types/Command';

export default new Command({
	name: CommandNameEnum.Test,
	description: '',
	type: ApplicationCommandType.ChatInput,
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'Test'
		});
	}
});
