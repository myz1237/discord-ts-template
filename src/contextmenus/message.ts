import { ApplicationCommandType } from 'discord.js';
import { MessageContextMenu } from 'structures/ContextMenu';
import { ContextMenuNameEnum } from 'types/ContextMenu';

export default new MessageContextMenu({
	name: ContextMenuNameEnum.Test,
	type: ApplicationCommandType.Message,
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'Test'
		});
	}
});
