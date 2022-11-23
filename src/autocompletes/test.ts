import { Auto } from '../structures/AutoComplete';

export default new Auto({
	correspondingCommandName: '',
	execute: ({ interaction }) => {
		return interaction.respond([]);
	}
});
