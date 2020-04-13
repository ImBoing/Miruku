const ms = require("ms");

module.exports = {
    config: {
        name: " slowmode",
        aliases: [" slowmode", " sm"],
        usage: "o!slowmode [time]",
        description: "Turns on slow mode in a specific channel",
        category:"Staff",
        noalias: "",
        accessibility: "Staff members"
    },
    run: async (bot, message, args) => {
        try {
            if(!message.member.hasPermission(["MANAGE_CHANNELS"]))
            return message.channel.send('Hey dummy, you are missing the `MANAGE_CHANNELS` permission.\nMake sure you have access to **manage and kick members** and try again');

            let channel = message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first();

            if (!channel){
                channel = message.channel
            }

            let time = args[0]
            if (!time) {
                channel.set
            }

            
        } catch(err) {
            console.log(err)
        }
    }
}