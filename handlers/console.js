module.exports = (bot) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        bot.channels.cache.get("662413532301885480").send(x.join(" "));
    });
}