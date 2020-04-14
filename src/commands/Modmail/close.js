const { MessageEmbed } = require("discord.js");
const { bad } = require("../../Utils/colors.json");
const modmail = require("../../models/modmail.js");
const mongoose = require("mongoose");

const { URI } = require('../../utils/botconfig.json')

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    config: {
        name: "close",
        aliases: ["close", "c"],
        usage: "o!close",
        description: "closes a modmail thread",
        category:"Modmail",
        noalias: "sad",
        accessibility: "staff",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap command"
    },
    run: async (bot, message, args) => {
        try {
            if (message.channel.parentID !== '690370450219335681') return;

            const array = message.channel.topic
            const id = array.split(' ')[2]
            const user = bot.users.cache.get(id)


            let usersThreads = await modmail.findOne({
                username: user.username
            });

            if(!usersThreads) {
                usersThreads = new modmail({
                    username: user.username,
                    threadCount: 1
                });
                await usersThreads.save().catch(err => console.log(err))
            };

            await modmail.findOne({
                username: user.username
            }, async (err, auser) => {
                auser.threadCount += 1
                await auser.save().catch(err => console.log(err))
            })

            const close = new MessageEmbed()
            .setColor(bad)
            .setTitle('Thread Closed')
            .setDescription(`<@${message.author.id}> has closed this Modmail thread`)
            .setFooter('Replying will open another thread', message.guild.iconURL())
            .setTimestamp()

            user.send(close)

            const channel = message.channel
            channel.delete()
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}