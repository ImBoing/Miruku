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
        try {
            let count = args[0]
                if (!count)
                    count = 11

        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) 
            return message.channel.send('Hey dummy, you are missing the `MANAGE_MESSAGES` permission.\nMake sure you have access to **manage and kick members** and try again');
        message.channel.bulkDelete(count).then(fetched => {
            message.channel.bulkDelete(fetched)
            message.channel.send(`Deleted ${count} ${count > 1 ? "messages" : "message"}. Are you happy now?`).then(message => message.delete({timeout: 2500}))
        })
            } catch(err) {
                console.log(err)
        } 
    }
}