const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const yeriQuotes = require("./members/yeri").quotes;

client.on('ready', () => {
    console.log('Ready for commands...');
});

client.on('message', async msg => {
    // Prevent bot from talking to itself or other bots, botception
    if(msg.author.bot) return;

    // If our message doesn't contain prefix, exit
    if(msg.content.indexOf(config.prefix) != 0) return;

    // Separate command name from arguments
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command =  args.shift().toLowerCase();
    
    // Return the latency of the bot and API
    if(command === 'ping') {
        const m = await msg.channel.send('Calculating your ping...');
        m.edit(`Ping = ${m.createdTimestamp - msg.createdTimestamp}ms. API latency is ${Math.round(client.ping)}ms.`);
    }
    
    // Quote yeri
    if(command === 'quote') {
        if (args[0] === 'yeri') {
            var message = yeriQuotes[Math.floor(Math.random()*yeriQuotes.length)];
            await msg.channel.send(message);
        }
    }

    // Play rock paper scissors
    if(command === 'rps') {
        if(args.length == 0) await msg.channel.send('Usage: !rps `rock, paper, or scissors`');
        // 0 = rock, 1 = paper, 2 = scissors
        const rand = Math.floor(Math.random() * 3);
        console.log(rand);

        if(args[0].toLowerCase() === 'rock') {
            if (rand === 0) await msg.channel.send('Seulgi chose rock, tie.');
            if (rand === 1) await msg.channel.send('Seulgi chose paper, you lost.');
            if (rand === 2) await msg.channel.send('Seulgi chose scissors, you win.');
        }
        if(args[0].toLowerCase() === 'paper') {
            if (rand === 0) await msg.channel.send('Seulgi chose rock, you win.');
            if (rand === 1) await msg.channel.send('Seulgi chose paper, tie.');
            if (rand === 2) await msg.channel.send('Seulgi chose scissors, you lost.');
        }
        if(args[0].toLowerCase() === 'scissors') {
            if (rand === 0) await msg.channel.send('Seulgi chose rock, you lost.');
            if (rand === 1) await msg.channel.send('Seulgi chose paper, you win.');
            if (rand === 2) await msg.channel.send('Seulgi chose scissors, tie.');
        }
    }
});

client.login(config.token);

