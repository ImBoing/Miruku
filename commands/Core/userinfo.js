const Discord = require("discord.js")
const colors = require("../../Utils/colors.json");

module.exports = {
    config: {
        name: "userinfo",
        aliases: ["whois", "uf"],
        usage: "o!userinfo",
        description: "Displays info about you or mentioned user",
        category:"Core",
        noalias: "No Aliases",
        accessibility: "All members on the server"
    },
    run: async (bot, message, args) => {
        let sEmbed = new Discord.RichEmbed()
            .setColor(colors.crimson)
            .setThumbnail(message.author.displayAvatarURL)
            .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
            .addField("**Username:**", `${message.author.username}`, true)
            .addField("**Discriminator:**", `${message.author.discriminator}`, true)
            .addField("**ID:**", `${message.author.id}`, true)
            .addField("**Status:**", `${message.author.presence.status}`, true)
            .addField("**Created On:**", `${message.author.createdAt}`, true)
            .setFooter(`© The Creek Tools | About ${message.member.user.tag} `)
            .setTimestamp();
        message.channel.send({
            embed: sEmbed
        });
    }
}