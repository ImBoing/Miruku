const { MessageEmbed } = require('discord.js');
const { bb } = require('../../Utils/colors.json');

module.exports = {
    config: {
        name: "love",
        aliases: ["love", "ship"],
        usage: "o!love",
        description: "See if two people are ment to be",
        category:"Fun",
        noalias: "",
        accessibility: "",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap command"
    },
    run: async (bot, message, args) => {
        try {
            let person = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])

            if (!person || message.author.id === person.id) {
                message.channel.send('Lmao, I guess your matching with someone random').then(msg => msg.delete({timeout: 1700}))
                person = message.guild.members.cache
                    .filter(m => m.id !== message.author.id)
                    .random();
            }

            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10)
            const loveLevel = '■'.repeat(loveIndex) + '□'.repeat(10 - loveIndex);

            const lembed = new MessageEmbed()
                .setColor(bb)
                .setTitle(`**${person.user.username}** loves **${message.member.user.username}** this much`)
                .setDescription(`${Math.floor(love)}% \n[${loveLevel}](https://discord.gg/u5hpAx6 '${loveLevel}')`)

                message.channel.send(lembed)
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}