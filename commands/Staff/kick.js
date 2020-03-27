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
            return message.channel.send("HAHA...You can't use this command, but I can. HAHA!");

        //Member that will be kicked
        const kickedMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!kickedMember)
            return message.channel.send("So who are you planning to kick if you're not gonna tell me their name?");

        //Reason why member was kicked
        const reason = args.slice(1).join(" ") || "No reason was provided";

        //Kicks member & informs member they have been kicked
        kickedMember.send(`You have been kicked from ${message.guild.name}\nBy: ${message.author.tag}\nFor: ${reason}\nIf you have a complaint on ${message.author.name}'s actions, please visit  `).then(() => 
        kickedMember.kick())

        
        }
    }
