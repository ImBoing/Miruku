const Discord = require("discord.js")
const colors = require("../../Utils/colors.json");


module.exports = {
    config: {
        name: "unmute",
        aliases: ["unmute", "Unmute", "um"],
        usage: "o!unmute [member]",
        description: "Unmutes specified user",
        category:"Staff",
        noalias: "",
        accessibility: "Staff"
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(['MANAGE_MESSAGES']))
            return message.channel.send('Hey dummy, you are missing the `MANAGE_MESSAGES` permission.\nMake sure you have access to **manage and remove messages** and try again ')

        const unmute = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])

        if(!unmute)
            return message.channel.send('bozo, mention a user to unmute by tagging them, user name or their ID')

        if(!unmute.roles.cache.some(r => r.name === 'Muted'))
            return message.channel.send('Are you serious? That user isn\'t even muted ')

        unmute.roles.remove('Muted')

        unmute.send(`You have been unmuted in ${message.guild.name}\n**By:** ${message.author.tag}`)
    }
}