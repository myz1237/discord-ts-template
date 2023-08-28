import { ApplicationCommandType } from 'discord.js';
import { UserContextMenu } from 'structures/ContextMenu';
import { ContextMenuNameEnum } from 'types/ContextMenu';

export default new UserContextMenu({
	name: ContextMenuNameEnum.Test,
	type: ApplicationCommandType.User,
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'Test'
		});
	}
});
