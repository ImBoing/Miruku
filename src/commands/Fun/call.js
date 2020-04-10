module.exports = {
    config: {
        name: "phone",
        aliases: ["phone", "cell"],
        usage: "o!phone",
        description: "Bored or not use your phone to call someone",
        category: "Fun",
        noalias: "",
        accessibility: "",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap command"
    },
    run: async (bot, message, args) => {
        try {
            // --------- Starting message --------- \\
            message.channel.send('__**Who would you like to call?**__\n`p` **∙  Call emergency services**\n`c` **∙  Phone your chef**\n`m` **∙  Text your mom**\n`b` **∙  Hit up the bomber**\n`r` **∙  Prank call**')

            // --------- Sleep function --------- \\
            const { sleep } = require('../../funtions.js')

            // --------- Message collector stuff --------- \\
            const filter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector(filter, {
                max: 1,
                time: 30000
            })
            const words = ['p', 'c', 'm', 'b', 'r', 'P', 'C', 'M', 'B', 'R'];


            // --------- Message collector --------- \\
            collector.on('collect', m => {
                // --------- If user responds with p --------- \\
                if(!words.some(str => m.content.includes(str))){
                    message.channel.send('Idiot, you have an Andriod not an iPhone. You can\'t do that with and Andriod')
                } else if (m.content === 'p' || m.content.content === 'P') {
                    // --------- Possible lines --------- \\
                    const author = ['Uh.....Hello?? Yeah I think I accidently shot my mom, My finger slipped. I think she\'s dead', 'Hello 911! Yeah It\'s Bill I\'m calling to report my noisy neighbor... She keeps screaming DADDY', 'HELP THERES A CRIME GOING ON',
                        'Please help!!! I\'m stuck in the back of the car. I think we are moving.... AHADGHJSA. PLEASE HELP ---', 'Help I\'ve fallen in the park and I can\'t get up!,', 'Um... This is kind of stange but..? I\'m stuck in my toilet!?! '
                    ]
                    const authorSays = author[Math.floor(Math.random() * author.length)]

                    const police = ['HAHA... that\'s real funny are you stupid or something. Why would a person call for that, anyways were coming over just wait a few days', 'Whos this?? I think you have the wrong number. Please DO NOT call emergency services as a prank, have a good day',
                        'Pizza hu- oh wait, this is the police how many I help you. Oh thats too bad all our officer\'s are busy at the moment. Please call again in a few WEEK\'S', 'SHUT UP, please stop calling this number. Were going to have to call the police if this continue\'s',
                        'You have reaced the voicemail box of (623) 420-6435. Please leave a message after the tone, *Hello thank you for calling the police, please do not leave a message!*', 'ARE YOU STUPID? I think you can slove this problem yourself. Now is there anything else that I can assist you with?..... Ok have a good day!'
                    ]
                    const policeSays = police[Math.floor(Math.random() * police.length)]

                    // --------- Message & edited messages --------- \\
                    message.channel.send('`Dialing emergency services...`').then(async msg => {
                        await sleep(2500)
                        const send = [`\`On the phone with the police\`\n**${message.author.username}**  ${authorSays}`]
                        await msg.edit(`${send}`)
                        await sleep(3250)
                        const send2 = [`${send}\n**Officer**  ${policeSays}`]
                        await msg.edit(`${send2}`)
                        await sleep(1000)
                        const send3 = [`${send2}}\n\n\`Call disconnected\``]
                        await msg.edit(`${send3}`)
                    })
                } else if (m.content === 'c' || 'C') {
                    // --------- Possible lines --------- \\
                    const caller = ['Aye Yo, habibi let me get a bacon egg and cheese. How much would that be?', 'Hello pizza hut? Yeah let me get a large pie - Actually make that an extra-large. Let me get peperonies \*like my nipples\*, cheese, sauce, and um............. actually can you make this two orders! Yeah add an extra small coke to the order! Thanks..', 
                        'Help!? My daddy went to go get milk but never came back. I think he\'s in your resturant buying milk. If you see him please tell my daddy that I called!', 'Uh.... Is this the Krusty Crab? Ok let me get 1 order of large kelp fries and um a karby patty delux and a kiddy meal! Oh wait this is Dunkin Donuts!', 'Panda express... Do you guys actually cook pandas? Let me get one order of that! Please!!!'
                ]
                    const callerSays = caller[Math.floor(Math.random() * caller.length)]

                    const chef = ['You IDIOT this is Wendy\'s our beef is 100% never frozen. Ok by why did you call, like do you need anything, because were about to close... Oh wait its 8 goodbye were closed', 'OMG is this Justin Beiber? AHHHHH your so hot, can I get your autograph (*to the chefs behind*)\n GUYS I need 30 cheese burgers NOWW!', 'Shut up! Were closed. The health officials gave us a Z. They said they have never seen anything like our resturant. Yeah so we can\'t cook nothing for you!',
                    'I got black I got white what you want? You said blue? I only have black and white what you want?', 'Welcum tu the India Resturant. How may I take your order! One order of the salibi habama. Ok that will be 13.08, uh deliver will take about shree days!'
                    ]
                    const chefSays = chef[Math.floor(Math.random() * chef.length)]

                    // --------- Message & edited messages --------- \\
                    message.channel.send('`Calling your chef...`').then(async msg => {
                        await sleep(2500)
                        const w = [`\`On the phone with the local resturant\`\n**${message.author.username}**  ${callerSays}`]
                        await msg.edit(`${w}`)
                        await sleep(3250)
                        const w2= [`${w}\n**Chef**  ${chefSays}`]
                        await msg.edit(`${w2}`)
                        await sleep(1000)
                        const w3 = [`${w2}\n\n\`Call disconnected\``]
                        await msg.edit(`${w3}`)
                    })

                } else if (m.content = 'm') {

                } else if (m.content = 'b') {

                } else if (m.content = 'r') {

                }
            })
        } catch (err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
        }
    }
}