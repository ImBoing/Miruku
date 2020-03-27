const { prefix } = require("../../Utils/botconfig.json");
const { MessageEmbed } = require("discord.js");
const { good, bb } = require("../../Utils/colors.json");

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
        // Send the user a message
        const sent = await bot.users.cache
            .get(message.channel.name)
            .send(message.content) // Returns true if successfully sent
            .catch(() => {}); // Returns false if there's an error
        message.react(sent ? "✅" : "❌"); // React with the correct emoji
    } else if (!guild.channels.cache.some((ch) => ch.name === message.author.id)) {
        // If there is no thread

        // Sends the user a success message
        const opened = new MessageEmbed()
            .setColor(good)
            .setTitle("Thread Created")
            .setDescription("The staff team has recieved your message, the staff team will respond shortly")
            .setFooter("Your message has been sent", guild.iconURL())
            .setTimestamp();

        await message.author.send(opened).then(() => message.react("✅"));

        // Creates the thread channel
        guild.channels
            .create(message.author.id, {
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
                // Instructions for the staff member
                const embed = new MessageEmbed()
                    .setTitle("New Thread")
                    .setColor(good)
                    .setDescription(
                        `Type a message in this channel to reply. Any command besides modmail commands ran will be ignored, to see all modmail commands run \`${prefix}help modmail\``
                    );

                threadChannel.send(embed).then((m) => m.delete({ timeout: 900000 }));

                // Sends user's message to thread
                const cntn = new MessageEmbed()
                    .setColor(bb)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(message.content)
                    .setFooter("Message recieved")
                    .setTimestamp();

                threadChannel.send(cntn);
            })
            .catch((err) => console.log(err));
    } else {
        // If there us already a thread

        // Find the thread channel
        const destination = guild.channels.cache.find((c) => c.name === message.author.id);
        const embed = new MessageEmbed()
            .setColor(bb)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
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