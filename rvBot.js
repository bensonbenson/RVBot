const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const ireneQuotes =  require("./members/irene").quotes;
const seulgiQuotes = require("./members/seulgi").quotes;
const wendyQuotes = require("./members/wendy").quotes;
const joyQuotes = require("./members/joy").quotes;
const yeriQuotes = require("./members/yeri").quotes;

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
    
    // Send random quote, lets user choose which member as an argument
    if(command === 'quote') {
        if(args.length == 0) {
            await msg.channel.send('Usage: !quote `irene, seulgi, wendy, joy, or yeri`');
            return; // Prevents error of calling toLowerCase() immediately after this
        } 
        const argument = args[0].toLowerCase();
        // Require explicit spelling and ignores any other args
        if((argument != 'irene' && argument != 'seulgi' && argument != 'wendy' && argument != 'joy' && argument != 'yeri')) {
            await msg.channel.send('Usage: !quote `irene, seulgi, wendy, joy, or yeri`');
        }

        if (argument === 'irene') {
            const message = ireneQuotes[Math.floor(Math.random()*ireneQuotes.length)];
            await msg.channel.send(message);
        }
        if (argument === 'seulgi') {
            var message = seulgiQuotes[Math.floor(Math.random()*seulgiQuotes.length)];
            await msg.channel.send(message);
        }
        if (argument === 'wendy') {
            var message = wendyQuotes[Math.floor(Math.random()*wendyQuotes.length)];
            await msg.channel.send(message);
        }
        if (argument === 'joy') {
            var message = joyQuotes[Math.floor(Math.random()*joyQuotes.length)];
            await msg.channel.send(message);
        }
        if (argument === 'yeri') {
            const message = yeriQuotes[Math.floor(Math.random()*yeriQuotes.length)];
            await msg.channel.send(message);
        }
    }

    // Play rock paper scissors
    if(command === 'rps') {
        if (args.length == 0) {
            await msg.channel.send('Usage: !rps `rock, paper, or scissors`');
            return; // Prevents error of calling toLowerCase() immediately after this
        }
        const argument = args[0].toLowerCase();
        // Require explicit spelling and ignores any other args
        if((argument != 'rock' && argument != 'paper' && argument !='scissors')) await msg.channel.send('Usage: !rps `rock, paper, or scissors`');

        // 0 = rock, 1 = paper, 2 = scissors
        const rand = Math.floor(Math.random() * 3);

        if(argument === 'rock') {
            if (rand === 0) await msg.channel.send('Seulgi chose rock, tie.');
            if (rand === 1) await msg.channel.send('Seulgi chose paper, you lost.');
            if (rand === 2) await msg.channel.send('Seulgi chose scissors, you win.');
        }
        if(argument === 'paper') {
            if (rand === 0) await msg.channel.send('Seulgi chose rock, you win.');
            if (rand === 1) await msg.channel.send('Seulgi chose paper, tie.');
            if (rand === 2) await msg.channel.send('Seulgi chose scissors, you lost.');
        }
        if(argument === 'scissors') {
            if (rand === 0) await msg.channel.send('Seulgi chose rock, you lost.');
            if (rand === 1) await msg.channel.send('Seulgi chose paper, you win.');
            if (rand === 2) await msg.channel.send('Seulgi chose scissors, tie.');
        }
    }
});

client.login(config.token);
