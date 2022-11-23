import { Button } from '../structures/Button';

export default new Button({
	customIds: [''],
	execute: ({ interaction }) => {
		return interaction.reply({
			content: 'WIP'
		});
	}
});
