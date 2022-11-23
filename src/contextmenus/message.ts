import { ApplicationCommandType } from 'discord.js';

import { MessageContextMenu } from '../structures/ContextMenu';

export default new MessageContextMenu({
	name: 'Test',
	type: ApplicationCommandType.Message,
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'Test'
		});
	}
});
