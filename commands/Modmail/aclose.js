module.exports = {
    config: {
        name: "aclose",
        aliases: ["ac", "a"],
        usage: "o!aclose",
        description: "closes thread anonmusly",
        category:"Modmail",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args, user) => {
        try {

            if(message.channel.parentID !== '690370450219335681') return;

            const channel = message.channel
            
            channel.delete()

            const c = new MessageEmbed()
            .setColor(bad)
            .setTitle('Thread Closed')
            .setDescription(`A staff member has closed this Modmail thread`)
            .setFooter('Replying will create a new thread', message.guild.iconURL())
            .setTimestamp()
            user.send(c)
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
        }
    }
}