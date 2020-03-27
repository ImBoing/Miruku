const { MessageEmbed } = require("discord.js")
const { bb } = require("../../Utils/colors.json");
const { prefix } = require("../../Utils/botconfig.json")


module.exports = {
    config: {
        name: "help",
        aliases: ["h", "help"],
        usage: "o!help",
        description: "",
        category:"Core",
        noalias: "No Aliases",
        accessibility: "All members on the server"
    },
    run: async (bot, message, args) => {
    try {
     if(!args[0]) {
            const help = new MessageEmbed()
                .setColor(bb)
                .setTitle('Mirukus Commands List')
                .setDescription(`User \`${prefix}help [command]\` to get more help. Example: \`${prefix}clap\``)
                .addField(':information_source: Core', `\`channel\` \`help\` \`ping\`\n\`roles\` \`serverinfo\`\n\`userinfo\``, true)
                .addField(':man_police_officer: Staff', `\`clear\` \`kick\` \`slowmode\`\n\`tempmute\` \`unmute\`\n\`ban\` \`unban\``, true)
                .addField(':tada: Giveaways', `\`start\` \`edit\` \`reroll\`\n\`end\``, true)

                message.channel.send(help)
                }

            }
        catch {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`serverinfo\` command, if this error occurs again message my creator for support (${owner})`)
        }
    }
}