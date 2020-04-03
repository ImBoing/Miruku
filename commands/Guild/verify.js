const Discord = require("discord.js")
const colors = require("../../Utils/colors.json");
const moment = require("moment");


module.exports = {
    config: {
        name: "verify",
        aliases: ["verify", "v"],
        usage: "o!verify",
        description: "The bot messages the user a verification code",
        category:"Guild",
        noalias: "",
        accessibility: "Everyone",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap command"
    },
    run: async (bot, message, args) => {
       if(message.channel.id === '679417535871057950'){
        /* Generates a verification code */
        function makeid(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const vCode = (makeid(10));

        /* Verification embed (gets sent to users DM's) */
        let date = new Date();
        let valid = moment(date).add(2, 'hours').format('MMM Do [at] __h:mm a__')

        let vEmbed = new Discord.RichEmbed()
            .setColor(colors.b_orange)
            .setTitle("Time to verify!")
            .setDescription('Your code will expire in __2 hours__ from the time this message was sent!!!')
            .addField('Server', `${message.guild.name}`, true)
            .addField('Experation', `${valid}`, true)
            .addField('Discriminator', `||#${message.author.discriminator}||`, true)
            .addField('Code', `||${vCode}||`, true)
            .addField('Max uses', "1", true)

        /* Message Collector */
        message.author.send(vEmbed).then(msg => {
            const filter = m => m.author.id === message.author.id;
            const channel = msg.channel;
            const collector = channel.createMessageCollector(filter, { max: 4 , time: 7200000 })
            let count = 2;
            let verified = false;
            let lastMessage;
            collector.on('collect', async message => {
                const response = require("../../response.json");
                const answer = response[Math.floor(Math.random() * response.length)];
                 if(message.content !== vCode) {
                    lastMessage = await message.author.send(answer + ` You have \`${count}\` ${count === 1 ? "try" : "tries"} left${count === 1 ? "!!!!!" : "."}`
                );
                count -= 1  
                } else {
                    verified = true;
                    collector.stop();
                }
            });

            collector.on('end', () => {
                if(!verified) {
                    setTimeout(() => {
                        lastMessage.edit(
                            `Run \`o!verify\` in ${message.guild.name} to recieve another code.`
                        );
                      }, 3000);
                } else {
                    const guild = bot.guilds.get('614632638883430450');
                    const member = guild.members.get(message.author.id);
                    member.addRole('619644394152263680').then(() =>
                    message.author.send(`Congrats you now have access to **${message.guild.name}**`));
                    } 
                });
            });
        }
    }
}