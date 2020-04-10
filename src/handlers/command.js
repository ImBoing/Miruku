const { readdirSync } = require("fs")
const ascii = require("ascii-table")
const table = new ascii().setHeading("Command", "Status")

module.exports = (bot) => {
const load = dirs => {
    const commands = readdirSync(`./src/commands/${dirs}`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
        const pull = require(`../commands/${dirs}/${file}`);

        if(pull.name) {
            bot.commands.set(pull.name, pull);
            table.addRow(file, `❎ Something is wrong with this file`)
        } else {
            table.addRow(file, `✅`)
        }
        bot.commands.set(pull.config.name, pull);
        if(pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
        };
    };
    ["Staff", "Guild", "Core", "Giveaways", "Fun", "Modmail", "Utilities"].forEach(x => load(x));
    console.log(table.toString());
};

/**
 * module.exports = {
    config: {
        name: "",
        aliases: ["", ""],
        usage: "",
        description: "",
        category:"",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        try {

        // some code here
        
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
        }
    }
}
 */