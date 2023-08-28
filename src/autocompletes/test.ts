import { Auto } from 'structures/AutoComplete';
import { CommandNameEnum } from 'types/Command';

export default new Auto({
	correspondingCommandName: CommandNameEnum.Test,
	execute: ({ interaction }) => {
		return interaction.respond([]);
	}
});
