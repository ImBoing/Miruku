const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "roles",
        aliases: ["server", "sr"],
        usage: "o!server roles",
        description: "Displays all the roles on the server",
        category:"Core",
        noalias: "",
        accessibility: "Everyone",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap command"
    },
    run: async (bot, message, args) => {
        if(args[0] === 'roles') {
        let rEmbed = new MessageEmbed()
            .setTitle(`**Roles** [${message.guild.roles.size}]`)
            .setDescription(message.guild.roles.map(r => r.name).join(", ").replace("@everyone", ", "))

        message.channel.send(rEmbed);
        }
    }
}