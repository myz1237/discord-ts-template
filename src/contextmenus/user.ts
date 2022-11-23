import { ApplicationCommandType } from 'discord.js';

import { UserContextMenu } from '../structures/ContextMenu';

export default new UserContextMenu({
	name: 'Test',
	type: ApplicationCommandType.User,
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'Test'
		});
	}
});
