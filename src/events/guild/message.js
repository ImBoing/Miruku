const { prefix } = require("../../utils/botconfig.json");
const { MessageEmbed } = require("discord.js");
const { good } = require("../../utils/colors.json");
const { moment } = require('moment');

module.exports = async (bot, message) => {

    if (message.content.startsWith(prefix)) {
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (command) return command.run(bot, message, args); // Return if there is a command
    }

    const guild = bot.guilds.cache.get("644304521425846312"); // Your guild id 

    if (
        message.author.bot || // Return if author is a bot 
        message.content.startsWith(prefix) || // Return if the message starts with the prefix
        (message.guild && message.guild.id !== guild.id) || // Return if the guild is incorrect
        (message.guild && message.channel.parentID !== "690370450219335681") // Return if guild channel & channel parent is incorrect
    )
        return;

    // If the message wat sent in a guild channel
    if (message.guild) {
        // Embed with staff members message
        const mg = new MessageEmbed()
            .setColor(good)
            .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discordapp.com/users/${message.author.id}`)
            .setDescription(message.content)
            .setFooter("Message recieved")
            .setTimestamp();

        // Send the user a message
        const array = message.channel.topic
        const id = array.split(' ')[2]
        const sent = await bot.users.cache
            .get(id)
                
            .send(mg) // Returns true if successfully sent
            .catch(() => {}); // Returns false if there's an error
        message.react(sent ? "✅" : "❌"); // React with the correct emoji
    } else if (!guild.channels.cache.some((ch) => ch.topic === 'Modmail channel '+ message.author.id + ' (Please do not change)')) {
        await message.react('✅')
        // If there is no thread then send user a success message
        const opened = new MessageEmbed()
            .setColor(good)
            .setTitle("Thread Created")
            .setDescription("The staff team has recieved your message, the staff team will respond shortly")
            .setFooter("Your message has been sent", guild.iconURL())
            .setTimestamp();

        message.author.send(opened);
        
        // Creates the thread channel
        guild.channels
            .create(message.author.tag.replace('#','-'), {
                parent: "690370450219335681",
                permissionOverwrites: [
                    {
                        id: "645450755142189057",
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: message.author.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "644306047292669973",
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
            })
            .then(threadChannel => {
                threadChannel.setTopic('Modmail channel '+ message.author.id + ' (Please do not change)')
                //Users account information
                const dateNow = new Date()
                const userCreated = new Date(message.author.createdAt)

                const timeDiff = Math.abs(userCreated.getTime() - dateNow.getTime());

                const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

                //Users join info
                const currentDate = new Date()
                const user = guild.members.cache.find(m => m.id === message.author.id)
                const joinedat = new Date(user.joinedAt)

                const timeDif = Math.abs(joinedat.getTime() - currentDate.getTime());

                const dayDif = Math.ceil(timeDif / (1000 * 3600 * 24))
                // Instructions for the staff member
                const embed = new MessageEmbed()
                    .setTitle("New Thread")
                    .setColor(good)
                    .setDescription(`<@${message.author.id}> was created ${diffDays} ${diffDays > 1 ? 'days' : 'day'} ago, user joined ${dayDif} ${dayDif > 1 ? 'days' : 'day'} ago. **Using non modmail commands will be ignored in this channel.**`)
                    .setFooter(`User id: ${message.author.id}`)
                    .setTimestamp()

                threadChannel.send(embed).then((m) => m.delete({ timeout: 900000 }));

                // Sends user's message to thread
                const cntn = new MessageEmbed()
                    .setColor(good)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discordapp.com/users/${message.author.id}`)
                    .setDescription(message.content)
                    .setFooter("Message recieved")
                    .setTimestamp();

                threadChannel.send(cntn);
            })
            .catch((err) => console.log(err));
    } else {
        // If there us already a thread then find the opened thread
        console.log("TEST")
        const destination = guild.channels.cache.find((c) => c.topic === 'Modmail channel '+ message.author.id + ' (Please do not change)');
        const embed = new MessageEmbed()
            .setColor(good)
            .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discordapp.com/users/${message.author.id}`)
            .setDescription(message.content)
            .setFooter("Message recieved")
            .setTimestamp();

        if (destination) {
            destination.send(embed);
            return message.react("✅");
        }

        message.react("❌");
   }
};