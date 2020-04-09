const { bb } = require('../../Utils/colors.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "avatar",
        aliases: ["avatar", "profilepic", "userpicture"],
        usage: "o!avatar",
        description: "Gets a users avatar",
        category:"Utilities",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        try {
            const user = message.author || message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])

            const embed = new MessageEmbed()
            .setColor(bb)
            .setTitle(user.tag)
            .setDescription(`[**Avatar URL**](${user.displayAvatarURL({ format: 'png', size: Number(1024) })})`)
            .setImage(user.avatarURL({ size: Number(1024) }))

            message.channel.send(embed)
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}