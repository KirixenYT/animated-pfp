const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    owner: true,
    data: new SlashCommandBuilder()
    .setName('animated')
    .setDescription('Animated avatar for your discord bot')
    .addAttachmentOption(option => option.setName('avatar').setDescription("Image avatar to anime!").setRequired(true)),
    async execute (interaction, client){
        
        const { options } = interaction;
        const avatar = options.getAttachment('avatar');

        async function sendMessage (message) {
            const embed = new EmbedBuilder()
            .setDescription(message);

            await interaction.reply({ embeds : [embed], ephemeral: true });
        }

        if (avatar.contentType !== "image/gif") return await sendMessage(`Please use a gif for the animated pfp`);

        var error;
        await client.user.setAvatar(avatar.url).catch(async err=> {
            error = true;
            console.log(err)
            return await sendMessage(`Error : \`${err.toString()}\``);
        });

        if (error) return;
        await sendMessage(`I've uploaded the avatar!`);
    }
}
