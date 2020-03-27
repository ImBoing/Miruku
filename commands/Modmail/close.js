const { MessageEmbed } = require("discord.js");
const { bad } = require("../../Utils/colors.json");

module.exports = {
    config: {
        name: "close",
        aliases: ["close", "c"],
        usage: "o!close",
        description: "closes a modmail thread",
        category:"Modmail",
        noalias: "sad",
        accessibility: "staff"
    },
    run: async (bot, message, args, user) => {
        try {
            if(message.channel.parentID !== '690370450219335681') return;

            const user = message.guild.members.cache.get(message.channel.name);
            const channel = message.channel

            channel.delete()

            const close = new MessageEmbed()
            .setColor(bad)
            .setTitle('Thread Closed')
            .setDescription(`<@${message.author.id}> has closed this Modmail thread`)
            .setFooter('Replying will open another thread', message.guild.iconURL())
            .setTimestamp()

            user.send(close)

        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}