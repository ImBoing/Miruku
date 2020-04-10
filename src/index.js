// Requring the packages and modules required
const { Client, Collection} = require("discord.js");
const bot = new Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require("fs");
//Used for logging bot in
const { token } = require("./utils/botconfig.json");

//Creating command an aliases collection
["commands", "aliases"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
bot.categories = fs.readdirSync("./src/commands/");

/* Needed for giveaways */
const config = require('./Utils/botconfig.json');
bot.config = config;

const { GiveawaysManager } = require('discord-giveaways');
bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./src/utils/giveaways.json",
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






