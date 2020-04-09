const Discord = require("discord.js")
const colors = require("../../Utils/colors.json");
const { prefix } = require("../../Utils/botconfig.json");

module.exports = {
    config: {
        name: "slowmode",
        aliases: ["slowmode", "sm"],
        usage: "o!slowmode [time]",
        description: "Turns on slow mode in a specific channel",
        category:"Staff",
        noalias: "",
        accessibility: "Staff members"
    },
    run: async (bot, message, args) => {
        let arr = ["615738440147009537", "615738442516791296", "615738444550766593"]
        if (!message.member.roles.some(i => arr.includes(i.id))) return message.channel.send("You do not have permission to use command this sorry")
            .then(m => m.delete(5000));

        const timeout = args[0];

        if (isNaN(args[0])) return message.reply("❌ please supply a number.");
        if (args[0] < 0) return message.reply("❌ please supply a number that equals more than 0 seconds.")
        if (args[0] > 21600) return message.reply("❌ please supply a number that is not higher than 21600 seconds.")
        if (args[0] === "off") return message.channel.send(":ok_hand: Slowmode has been **disabled**.").then(message.channel.setRateLimitPerUser(0));
        if (args[0] === "1") return message.channel.send(":ok_hand: Slowmode has been set to 1 message every **1 second**.").then(message.channel.setRateLimitPerUser(args[0]));
        message.channel.setRateLimitPerUser(args[0]);
        message.channel.send(":ok_hand: Slowmode has been set to 1 message every **" + args[0] + " seconds**.")
    }
}