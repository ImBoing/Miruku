const Discord = require("discord.js")
const colors = require("../../Utils/colors.json");
const { prefix } = require("../../Utils/botconfig.json");

module.exports = {
    config: {
        name: "roles",
        aliases: ["server", "sr"],
        usage: "o!server roles",
        description: "Displays all the roles on the server",
        category:"Core",
        noalias: "",
        accessibility: "Everyone"
    },
    run: async (bot, message, args) => {
        if(args[0] === 'roles') {
        let rEmbed = new Discord.RichEmbed()
            .setTitle(`**Roles** [${message.guild.roles.size}]`)
            .setDescription(message.guild.roles.map(r => r.name).join(", ").replace("@everyone", ", "))

        message.channel.send(rEmbed);
        }
    }
}