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
        let target = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
        let muteReason = args.slice(2).join(' ') || "No reason specified";
        let arr = ["615738440147009537", "615738442516791296", "615738444550766593"]

        if (!target) return message.reply("Please specify a user");
        if (!message.member.roles.some(i => arr.includes(i.id))) return message.channel.send("You do not have permission to use command this sorry");
        if (target.roles.some(i => arr.includes(i.id))) return message.channel.send("You can not mute a staff member");
        let muterole = message.guild.roles.find(`name`, "Muted");

        if (message.guild.roles.has(muterole)) return;
        if (!muterole) {
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
        let muteTime = args[1];
        if (!muteTime) return message.reply(`Please specify how long I should mute <@${target.id}>`);

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

        await (target.addRole(muterole.id));
        let TMembed = new Discord.RichEmbed()
            .setColor(colors.b_orange)
            .setDescription(`<@${target.id}> has been muted for ${mutedTime(muteTime)}\n\n` +
                "**Reason:**\n" +
                muteReason)
            .setFooter(`shit`)
        message.channel.send(TMembed)
        target.send(`You have been muted for ${mutedTime(muteTime)} by ${message.author}`)

        setTimeout(function () {
            target.removeRole(muterole.id)
            let TOembed = new Discord.RichEmbed()
            .setColor(colors.b_orange)
                .setDescription(`<@${target.id}> has been unmuted`)
            target.send(`You have been unmuted in ${message.guild.name}`)

            message.channel.send(TOembed).then(message => message.delete(2500));
        }, ms(muteTime));
    }
}