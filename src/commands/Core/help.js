const {
    MessageEmbed
} = require("discord.js");
const {
    bb
} = require("../../utils/colors.json");
const {
    prefix
} = require("../../utils/botconfig.json");


module.exports = {
    config: {
        name: "help",
        aliases: ["help", "helpme", "commands", "cmds"],
        usage: "o!help",
        description: "",
        category: "Core",
        noalias: "No Aliases",
        accessibility: "All members on the server",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap\ncommand"
    },
    run: async (bot, message, args) => {
        try {
            if (!args[0]) {
                const help = new MessageEmbed()
                    .setColor(bb)
                    .setTitle('Mirukus Commands List')
                    .setDescription(`Use \`${prefix}help [command]\` to get more help. Example: \`${prefix}clap\``)
                    .addField(':information_source: Core', `\`channel\` \`help\` \`ping\`\n\`roles\` \`serverinfo\`\n\`userinfo\``, true)
                    .addField(':man_police_officer: Staff', `\`clear\` \`kick\` \`slowmode\`\n\`tempmute\` \`unmute\`\n\`ban\` \`unban\``, true)
                    .addField(':balloon: Fun', `\`call\` \`clap\` \`hack\`\n\`lenny\` \`love\``, true)
                    .addField(':tools: Utilities', `\`edit\` \`reroll\`\n\`end\``, true)
                    .addField(':tada: Giveaways', `\`start\` \`edit\` \`reroll\`\n\`end\``, true)

                message.channel.send(help)
            } else {
                const embed = new MessageEmbed()
                let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                if (!command) return message.channel.send(embed.setDescription(`That command dose not exist, use \`${prefix}help\` to see all the commands`).setColor(bb))
                command = command.config

                const hEmbed = new MessageEmbed()
                    .setAuthor('Mirkuku Help Menu')
                    .setTitle(`**${prefix}${command.name.slice(0, 1).toLowerCase() + command.name.slice(1)}**`)
                    .setDescription(`\`\`\`${command.description || "No Description provided."}\`\`\``)
                    .addField('**Examples**', `${command.example}`, true)
                    .addField('\u200b', '\u200b', true)
                    .addField('**Usage**', `\`${command.usage}\``)
                    .addField('**Aliases**', `\`${command.aliases ? command.aliases.join('` `') : `${command.name}`}\``)
                    .setColor(bb)

                message.channel.send(hEmbed)
            }

        } catch (err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`serverinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}