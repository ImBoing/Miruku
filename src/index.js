/**MODMAIL
 * https://hastebin.com/birolegile.js
 * https://hastebin.com/urixuyuvur.js
 * 
 */




// Requring the packages and modules required
const { Client, Collection} = require("discord.js");
const bot = new Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require("fs");
//Used for logging bot in
const { token } = require("./Utils/botconfig.json");
//Modmail


//Creating command an aliases collection
["commands", "aliases"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
bot.categories = fs.readdirSync("./commands/");

/* Needed for giveaways */
const config = require('../Utils/botconfig.json');
bot.config = config;

const { GiveawaysManager } = require('discord-giveaways');
bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./Utils/giveaways.json",
    updateCountdownEvery: 30000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#03be6f",
        embedColorEnd: " #fc6c85",
        reaction: "🎉"
    }
});

bot.login(token);






