module.exports = {
    config: {
        name: "lenny",
        aliases: ["lenny"],
        usage: "o!lenny",
        description: "I don't know just use it and see",
        category:"Fun",
        noalias: "",
        accessibility: "",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap command"
    },
    run: async (bot, message, args) => {
        try {
            const possibleLenny = ['( ͡° ͜ʖ ͡°)', '( ͠° ͟ʖ ͡°)', '( ͡~ ͜ʖ ͡°)', '(ง ͠° ͟ل͜ ͡°)ง', 'ᕦ( ͡° ͜ʖ ͡°)ᕤ', 'ಠ_ಠ', '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)']
            const lenny = possibleLenny[Math.floor(Math.random() * possibleLenny.length)]

            message.channel.send(lenny)
        
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
        }
    }
}