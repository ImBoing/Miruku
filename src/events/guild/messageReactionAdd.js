const { MessageEmbed } = require('discord.js');
const { bb } = require('../../Utils/botconfig.json')

module.exports = async (bot, reaction, user) => {
    if (reaction.emoji.name === '🌟') {
        if (reaction.message.partial) {
            const fetchedMsg = await reaction.message.fetch();
            const starboard = bot.channels.cache.find(ch => ch.name.toLowerCase() === 'starboard');
            const msgs = await starboard.messages.fetch({
                limit: 100
            });
            console.log('Fetched msgs in starboard channel')
            const existingMsg = msgs.find(msg => {
                if (msg.embeds.length === 1) {
                    if (msg.embeds[0].footer.text.startsWith(fetchedMsg.id))
                        return true;
                    return false;
                } else return false;
            });
            if (existingMsg) {
                existingMsg.edit(`✨ **${reaction.count}** ${fetchedMsg.channel}`)
            } else {
                const sentAt = new Date(fetchedMsg.createdTimestamp)
                const embed = new MessageEmbed()
                    .setColor(bb)
                    .setAuthor(fetchedMsg.author.username, fetchedMsg.author.displayAvatarURL())
                    .addField('Jump to message', `[**Jump!**](${fetchedMsg.url})`)
                    .setDescription(fetchedMsg.content)
                    .setFooter(fetchedMsg.id)
                    .setTimestamp(sentAt)


                if (starboard) {
                    starboard.send(`✨ **1** ${fetchedMsg.channel}`, embed)
                }
            }
        } else {
            const starboard = bot.channels.cache.find(ch => ch.name.toLowerCase() === 'starboard');
            const msgs = await starboard.messages.fetch({
                limit: 100
            });
            const existingMsg = msgs.find(msg => {
                if (msg.embeds.length === 1) {
                    if (msg.embeds[0].footer.text.startsWith(reaction.message.id)) {
                        console.log('Message started found');
                        return true;
                    }
                    return false;
                }
                return false;
            })
            if (existingMsg) {
                existingMsg.edit(`✨ **${reaction.count}** ${reaction.message.channel}`)
            } else {
                const sentAt = new Date(reaction.message.createdTimestamp)
                const embed = new MessageEmbed()
                    .setColro(bb)
                    .setAuthor(reaction.message.author.username, reaction.message.author.displayAvatarURL())
                    .addField('Jump to message', `[**Jump!**](${reaction.message.url})`)
                    .setDescription(reaction.message.content)
                    .setFooter(reaction.message.id)
                    .setTimestamp(sentAt)

                if (starboard) {
                    starboard.send(`✨ **1** ${reaction.message.channel}`, embed)
                }
            }
        }
    }
}
