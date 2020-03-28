module.exports = {
    config: {
        name: "kick",
        aliases: ["kick"],
        usage: "o!kick [user]",
        description: "kicks the mentioned user",
        category:"Staff",
        noalias: "",
        accessibility: "Staff Only"
    },
    run: async (bot, message, args, error) => {
        //Used to check users permissions
        if(!message.member.hasPermission(["KICK_MEMBERS"]))
            return message.channel.send('Hey dummy, you are missing the `KICK_MEMBERS` permission.\nMake sure you have access to **manage and kick members** and try again');

        //Member that will be kicked
        const kickedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
        
        if(!kickedMember)
            return message.channel.send('bozo, mention a user to kick by tagging them, user name or their ID');

        //Reason why member was kicked
        const reason = args.slice(1).join(" ") || "No reason was provided";

        //Kicks member & informs member they have been kicked
        kickedMember.kick().then(() => {
            try {
            kickedMember.send(`You have been kicked from ${message.guild.name}\n**Reason:** ${reason}\n**Responsible Staff Member:** ${message.author.tag}`)
                } catch(err) {
                    return;
                }
            }) 
        }
    }
