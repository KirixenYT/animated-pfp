const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    owner: true,
    data: new SlashCommandBuilder()
        .setName('animated')
        .setDescription('Animated avatar for your discord bot')
        .addAttachmentOption(option => option.setName('avatar').setDescription("Image avatar to anime!").setRequired(true)),

    async execute(interaction, client) {
        const { options } = interaction;
        const avatar = options.getAttachment('avatar');

        if (avatar.contentType !== "image/gif") {
            const embed = new EmbedBuilder().setDescription("Please use a gif for the animated pfp.");
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            await client.user.setAvatar(avatar.url);
            const embed = new EmbedBuilder().setDescription("I've uploaded the pfp!");
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            const embed = new EmbedBuilder().setDescription(`Error: \`${error.toString()}\``);
            await interaction.editReply({ embeds: [embed] });
        }
    }
}
