// Import the SlashCommandBuilder class
const { SlashCommandBuilder } = require('@discordjs/builders');

// Define the command data
const data = new SlashCommandBuilder()
  .setName('uptime')
  .setDescription('bot uptime');

async function execute(interaction) {
  const uptime = interaction.client.uptime;

  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const seconds = Math.floor((uptime / 1000) % 60);

  await interaction.reply(`My uptime is ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
}

module.exports = {
  data,
  execute
};
