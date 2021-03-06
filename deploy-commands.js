// This is how each command is deployed. It grabs each file from the commands file, and pushed it to the commands array in a JSON format.

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("../Lennox/config.json");

const commands = [];
const commandFiles = fs.readdirSync('../Lennox/commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
