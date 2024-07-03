const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    owner: true,
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Put an animated gif, bastard')
        .addAttachmentOption(option => option.setName('banner').setDescription("Put an animated gif banner").setRequired(true)),

    async execute(interaction, client) {
        const { options } = interaction;
        const banner = options.getAttachment('banner');

        if (banner.contentType !== "image/gif") {
            const embed = new EmbedBuilder().setDescription("Please use a gif for the animated banner.");
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            await client.user.setBanner(banner.url);
            const embed = new EmbedBuilder().setDescription("I've uploaded the banner!");
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            const embed = new EmbedBuilder().setDescription(`Error: \`${error.toString()}\``);
            await interaction.editReply({ embeds: [embed] });
        }
    }
};