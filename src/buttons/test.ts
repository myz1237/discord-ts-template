import { Button } from 'structures/Button';
import { ButtonCustomId } from 'types/Button';

export default new Button({
	customIds: [ButtonCustomId.Test],
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'WIP'
		});
	}
});
