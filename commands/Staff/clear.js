const { prefix } = require("../../Utils/botconfig.json");

module.exports = {
    config: {
        name: "clear",
        aliases: ["clear", "delete"],
        usage: "o!clear [ammount]",
        description: "clears specified number of messages",
        category:"Staff",
        noalias: "",
        accessibility: "Staff members"
    },
    run: async (bot, message, args) => {
        if(message.content === `${prefix}clear`) return message.channel.send("The full command is `o!clear [number]`. For more commands do `o!help`.")

        let perm = ["615738440147009537", "615738442516791296", "615738444550766593"]
        const emojis = bot.emojis.get("664976680317878308");
        if (!message.member.roles.some(i => perm.includes(i.id))) return message.channel.send(`${emojis} You do not have permission to use command this sorry`);
        let messageCount = args[0];
        if (!messageCount) return message.channel.send("Please indicate how many messages you want to be deleted");

        await message.channel.send(`CTRL + ALT + DELT`).then(message => message.delete(1000))
        message.channel.bulkDelete(args[0]).then(fetched => {
            message.channel.bulkDelete(fetched)
            const emoji = bot.emojis.get("664977875254116372")
            message.channel.send(`${emoji} I have deleted ${messageCount} ${messageCount > 1 ? "messages" : "message"} `).then(message => message.delete(2500))
        }).catch(Error); console.error();
    }
}