const ms = require("ms");

module.exports = {
    config: {
        name: "start",
        aliases: ["start", "s"],
        usage: "o!start",
        description: "Starts a giveaway",
        category:"Giveaways",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        /* Checks members permissions */
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Sorry you don't have permission to this command");

        /* Giveaway channel */
        let gChannel = message.mentions.channels.first() || args[0]
        if(!gChannel) return message.channel.send("Please mention a channel that is in this server");

        /* Giveaway duration */
        let gDuration = args[1];
        if(!gDuration || isNaN(ms(gDuration))) return message.channel.send("How long should the giveaway be?");

        /* Number of winner */
        let gWinner = args[2];
        if(isNaN(gWinner)) return message.channel.send("Please specify how many winners there should be?");

        /* Prize */
        let gPrize = args.slice(3).join(' ');
        if(!gPrize) return message.channel.send("Uh...whats the prize?");

        /* Start the giveaway */
        bot.giveawaysManager.start(gChannel, {
            time: ms(gDuration),
            prize: gPrize,
            winnerCount: gWinner,
            hostedBy: bot.config.hostedBy ? message.author : null,
            messages: {
                giveaway: (bot.config.everyoneMention ? "@everyone\n\n" : "")+"🎉**GIVEAWAY**🎉",
                giveawayEnded: (bot.config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY ENDED** 🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "saddsad",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: (gWinner > 1 ? "Winnes" : "Winner"),
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        });
        message.channel.send(`Giveaway started in ${gChannel}`);
    }
}