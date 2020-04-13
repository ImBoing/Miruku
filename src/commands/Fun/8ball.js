module.exports = {
    config: {
        name: "8ball",
        aliases: ["8ball", "magicball", "fortune"],
        usage: "o!8ball <question>",
        description: "Ask the (stupid) magic 8ball about your desitny",
        category:"Fun",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        try {
            const { Ballresponses } = require("../../replies.js");

            if (!args[0]) {
                message.channel.send('Did you think about what you were gonna ask me you bozo')
            } else {
            const answer = Ballresponses[Math.floor(Math.random() * Ballresponses.length)]
            message.channel.send(`🎱 ${answer}`)
            }

            

        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}