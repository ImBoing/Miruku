module.exports = {
    config: {
        name: "clap",
        aliases: ["clap", "clapify"],
        usage: "o!clap",
        description: "Make the bot clpa what you say",
        category:"Fun",
        noalias: "ds",
        accessibility: "sd"
    },
    run: async (bot, message, args) => {
        try {
            const split = args[0].split('');
            const result = split.join(' 👏 ')

            if(!args[0])
                return message.channel.send('Hey idiot, tell me what to say')

            if(args.length === 1) {
                message.delete()
                await message.channel.send(result)
            } else {
                message.delete()
                await message.channel.send(args.join(' 👏 '))
            }
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`${config.name}\` command, if this error occurs again message my creator for support (${owner})`)
        }
    }
}