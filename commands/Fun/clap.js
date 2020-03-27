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
            const claptxt = args.slice(0).join(" :clap: ")

            if(!claptxt)
                return message.channel.send('Hey idiot, tell me what to say')

            await message.delete()

            await message.channel.send(claptxt)
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`${config.name}\` command, if this error occurs again message my creator for support (${owner})`)
        }
    }
}