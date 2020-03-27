module.exports = {
    config: {
        name: "ping",
        aliases: ["ping", "p"],
        usage: "o!ping",
        description: "Used to test Mirukus response time",
        category:"Core",
        noalias: "sdf",
        accessibility: "sdf"
    },
    run: async (bot, message, args) => {
        try {
            const send = await message.channel.send('Ping!')

            send.edit(`:ping_pong: | Pong! Time taken - **${send.createdTimestamp - message.createdTimestamp}ms**`)

        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}