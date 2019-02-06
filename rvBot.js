const Discord = require("discord.js");
const request = require("request");
const client = new Discord.Client();
const config = require("./config.json");
const ireneQuotes =  require("./members/irene").quotes;
const seulgiQuotes = require("./members/seulgi").quotes;
const wendyQuotes = require("./members/wendy").quotes;
const joyQuotes = require("./members/joy").quotes;
const yeriQuotes = require("./members/yeri").quotes;
const eightBall = require("./utilities/eightball").quotes;
const commandList = require("./utilities/commands").embed;
const keys = require("./utilities/scramble").keys;
const shuffledWord = require("./utilities/scramble").shuffled;


client.on('ready', () => {
    console.log('Ready for commands...');
});

// Utilize async to send messages to the channel
client.on('message', async msg => {
    // Prevent bot from talking to itself or other bots, botception
    if(msg.author.bot) return;

    // If our message doesn't contain prefix, exit
    if(msg.content.indexOf(config.prefix) != 0) return;

    // Separate command name from arguments
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command =  args.shift().toLowerCase();

    // Returns the latency of the bot and API
    if(command === 'ping') {
        const m = await msg.channel.send('Calculating your ping...');
        m.edit(`Ping = ${m.createdTimestamp - msg.createdTimestamp}ms. API latency is ${Math.round(client.ping)}ms.`);
    }

    // Show the command list
    if (command === 'command' || command === 'commands' || command === 'commandlist') {
        await msg.channel.send(commandList);
    }
    
    // Send random quote, lets user choose which member as an argument
    if(command === 'quote') {
        if(args.length == 0) {
            await msg.channel.send('Usage: !quote `irene, seulgi, wendy, joy, or yeri`.');
            return; // Prevents error of calling toLowerCase() immediately after this
        } 
        const argument = args[0].toLowerCase();
        // Require explicit spelling and ignores any other args
        if((argument != 'irene' && argument != 'seulgi' && argument != 'wendy' && argument != 'joy' && argument != 'yeri')) {
            await msg.channel.send('Usage: !quote `irene, seulgi, wendy, joy, or yeri`.');
        }

        let message;
        switch(argument) {
            case 'irene':
                message = ireneQuotes[Math.floor(Math.random()*ireneQuotes.length)];
                await msg.channel.send(message);
                return;
            case 'seulgi':
                message = seulgiQuotes[Math.floor(Math.random()*seulgiQuotes.length)];
                await msg.channel.send(message);
                return;
            case 'wendy':
                message = wendyQuotes[Math.floor(Math.random()*wendyQuotes.length)];
                await msg.channel.send(message);
                return;
            case 'joy':
                message = joyQuotes[Math.floor(Math.random()*joyQuotes.length)];
                await msg.channel.send(message);
                return;
            case 'yeri':
                message = yeriQuotes[Math.floor(Math.random()*yeriQuotes.length)];
                await msg.channel.send(message);
                return;
        }
    }

    // Play rock paper scissors
    if(command === 'rps') {
        if (args.length == 0) {
            await msg.channel.send('Usage: !rps `rock, paper, or scissors`.');
            return; // Prevents error of calling toLowerCase() immediately after this
        }
        const argument = args[0].toLowerCase();
        // Require explicit spelling and ignores any other args
        if((argument != 'rock' && argument != 'paper' && argument !='scissors')) await msg.channel.send('Usage: !rps `rock, paper, or scissors`.');

        // 0 = rock, 1 = paper, 2 = scissors
        // Current functionality of this game is complete randomness
        const rand = Math.floor(Math.random() * 3);

        // Future addition: adjust game difficulty based on member 
        let rpsStatus = 'Seulgi chose ';
        switch(argument) {
            case 'rock':
                switch(rand) {
                    case 0:
                        rpsStatus += 'rock , tie.';
                        await msg.channel.send(rpsStatus);
                        return;
                    case 1:
                        rpsStatus += 'paper, you lost.';
                        await msg.channel.send(rpsStatus);
                        return;
                    case 2:
                        rpsStatus += 'scissors, you win.';
                        await msg.channel.send(rpsStatus); 
                        return;
                }
            case 'paper':
                switch(rand) {
                    case 0:
                        rpsStatus += 'rock, you win.';
                        await msg.channel.send(rpsStatus);
                        return;
                    case 1:
                        rpsStatus += 'paper, tie.';
                        await msg.channel.send(rpsStatus);
                        return;
                    case 2:
                        rpsStatus += 'scissors, you lost.';  
                        await msg.channel.send(rpsStatus);
                        return;
                }
            case 'scissors':
                switch(rand) {
                    case 0: 
                        rpsStatus += 'rock, you lost.';
                        await msg.channel.send(rpsStatus);
                        return;
                    case 1:
                        rpsStatus += 'paper, you win.';
                        await msg.channel.send(rpsStatus);
                        return;
                    case 2:
                        rpsStatus += 'scissors, tie.'
                        await msg.channel.send(rpsStatus);
                        return;
                }
        }
    }

    // Let the user ask 8ball a question, returns a random response, regardless of question.
    if (command === '8ball') {
        if (args.length == 0) {
            await msg.channel.send('Usage: !8ball `your query here`.');
            return;
        }
        const message = eightBall[Math.floor(Math.random()*eightBall.length)];
        await msg.channel.send(message);
    }

    // Roll an N number sided die
    if (command === 'd') {
        // Check for valid integer args
        // eg: if args exists, is actual integer, is a value greater than 0, but making sure the integer is below the MAX_SAFE_INTEGER value
        if ((args.length == 0) || (isNaN(args)) || (args < 1) || (args > Number.MAX_SAFE_INTEGER)) {
            await msg.channel.send('Usage: !d `6, 12, 20, 100, or any number of valid integer sides here`.');
            return;
        }
        const message = Math.floor(Math.random()*args) + 1;
        await msg.channel.send('Rolled a ' + message);
    }

    // Play a word scramble game
    if (command === 'scramble') {
        // Get random index from array of keys and get the keyWord and scrambledWord
        const index = Math.floor(Math.random()*keys.length);
        const keyWord = keys[index];
        const scrambledWord = shuffledWord[index];
        await msg.channel.send(`Unscramble this: ${scrambledWord}`)
        .then(() => {
            // Utilize "awaitMessages" to continue listening for further messages, times out after 30000
            msg.channel.awaitMessages(response => response.content === keyWord, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then (async collected => {
                // If a person sends the correct answer, tag them and end.
                // This format is the only way to actually mention the username in the server
                await msg.channel.send(`<@${collected.first().member.id}> won! ${collected.first().content} is the correct answer.`);
            })
            .catch(async () => {
                // If there was no correct answer in the time limit, time out
                await msg.channel.send('There was no correct answer within the time limit.')
            });
        });
    }

    // Uses thecatapi to send a random cat as a message
    if (command === 'randomcat') {
        request.get('http://thecatapi.com/api/images/get?format=src&type=png', {
        }, async function(error, response) {
            if(!error && response.statusCode == 200) {
                await msg.channel.send(response.request.uri.href);
            } else {
                console.log(error);
            }
        });
    }
});

client.login(config.token);
