const colors = require("../../Utils/colors.json");
const moment = require("moment")
const { prefix } = require("../../Utils/botconfig.json");
const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "server",
        aliases: ["serverinfo", "si"],
        usage: "Run the command to learn more about *The Creek*",
        description: "A list of important information on the server",
        category:"Core",
        noalias: "No Aliases",
        accessibility: "All members"
    },
    run: async (bot, message, args) => {
        try {
            message.channel.startTyping();
            setTimeout(async function () {
            message.channel.stopTyping(true)}, 1000);
        } 
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }

        const categories = message.guild.channels.cache.filter(x => x.type == "category").size

        const sEmbed = new MessageEmbed()
            .setColor(colors.dodger_blue)
            .setAuthor(`${message.guild.name}`)
            .setTitle(`ID: ${message.guild.id}`)
            .addField('Region', `${message.guild.region}`, true)
            .addField('Prefix', prefix, true)
            .addField('Members', `${message.guild.memberCount}`, true)
            .addField(`Channels [${message.guild.channels.cache.size}]`, `Categories: ${categories} ${categories > 1 ? "categories" : "category"} \n\n Text: ${message.guild.channels.cache.filter(j => j.type == "text").size} \n Voice: ${message.guild.channels.cache.filter(k => k.type == "voice").size}`)
            .addField("Server Owner", `${message.guild.owner.user.tag} [${message.guild.owner.id}]`)
            .addField("Created On", `${moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm a [(EST)]')}`)
            .addField(`Roles [${message.guild.roles.cache.size}]`, `To see a list of all available roles do \`o!roles\``)
            .setFooter(`© The Creek Tools | ${message.member.user.tag}`)
            .setTimestamp();

            message.channel.send(sEmbed)
    }
}