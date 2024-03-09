
const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
require('dotenv').config();

const token = process.env.TOKEN;
const clientId = '';
const guildId = '';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers, // Enable GuildMembers intent
    ],
});

client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        activities: [{ name: 'KiriXen Studio 🪐', type: 3 }],
        status: 'dnd',
    });

    const rest = new REST({ version: '10' }).setToken(token);
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client); // Pass the client object to execute function
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        }
    }
});

client.login(token);

