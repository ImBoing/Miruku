const Discord = require("discord.js")
const colors = require("../../Utils/colors.json");
const ms = require("ms");

module.exports = {
    config: {
        name: "tempmute",
        aliases: ["tempmute", "tm"],
        usage: "o!tempmutemute [member] [time] (reason)",
        description: "Mutes the mentioned user",
        category:"Staff",
        noalias: "",
        accessibility: "Staff members"
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(['MANAGE_MESSAGES']))
            return message.channel.send('Hey dummy, you are missing the `MANAGE_MESSAGES` permission.\nMake sure you have access to **manage and remove messages** and try again')
        
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
        const reason = args.slice(2).join(' ') || "No reason specified";
        
        if(!target) return message.reply("Please specify a user");
        
        const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');

        if(message.guild.roles.cache.has(muterole)) return;
        if(!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#00000",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REATIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        const muteTime = args[1];
        if(!muteTime) return message.reply(`Please specify how long I should mute <@${target.id}>`);

        function mutedTime(muteTime) {
            if (muteTime.includes("1s")) {
                return muteTime.replace("1s", "1 second")
            } else {
                if (muteTime.includes("1m")) {
                    return muteTime.replace("1m", "1 minute")
                } else {
                    if (muteTime.includes("1h")) {
                        return muteTime.replace("1h", "1 hour")
                    } else {
                        if (muteTime.includes("1d")) {
                            return muteTime.replace("1d", "1 day")
                        } else {
                            if (muteTime.includes("s")) {
                                return muteTime.replace("s", " seconds")
                            } else {
                                if (muteTime.includes("m")) {
                                    return muteTime.replace("m", " minutes")
                                } else {
                                    if (muteTime.includes("h")) {
                                        return muteTime.replace("h", " hours")
                                    } else {
                                        if (muteTime.includes("d")) {
                                            return muteTime.replace("d", " days")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        await (target.roles.add(muterole));
        message.channel.send(`**${target.user.username}** has been muted for ${mutedTime(muteTime)}, must suck to be them`)
        target.send(`You have been muted from ${message.guild.name} for ${mutedTime(muteTime)}\n**Reason:** ${reason}\n**Responsible Staff Member:** ${message.author.tag}`)

        setTimeout(() => {
            target.roles.remove(muterole.id)
            target.send(`Your ${mutedTime(muteTime)} in ${message.guild.name} has expried, congratulations`)
        }, ms(muteTime));
    }
}