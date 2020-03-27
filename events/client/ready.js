module.exports = async bot => {
    const url = await bot.generateInvite("ADMINISTRATOR");

    console.log(`Guilds         ==          ${bot.guilds.cache.size} `);
    console.log(`Users          ==          ${bot.users.cache.size} `);
    console.log(`Commands       ==          ${bot.commands.size} `);
    console.log(`Time           ==          ${new Date()} `);
    console.log(`Invite         ==          ${url} `);

    const { prefix } = require("../../Utils/botconfig.json")

   let statuses = [
       `${prefix}help`,
       `Fruity Pebbles`
   ]

   setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status, {type: "WATCHING"});

   }, 5000);

};