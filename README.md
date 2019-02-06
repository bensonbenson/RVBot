# RVBot

A cleaned up version of [this](https://github.com/bensonbenson/F-X-Cord-Member-Info-and-Gif-Bot), and centered around Red Velvet.

## Usage

* Create a file called `config.json` in the same directory as `rvBot.js` (I know `rvBot.js` isn't good naming conventions for this file)

* In the JSON file, you should include something like this (Your prefix can be whatever you want to call a command):

```json
{ 
  "token"  : "your bot token here",
  "prefix" : "!"
}
```

* Then, run this in the command prompt:
```
npm init
npm i discord.js
node rvBot
```

`node rvBot` will start the bot up.

Not sure how to add a bot to your Discord server? [Try this](https://github.com/jagrosh/MusicBot/wiki/Adding-Your-Bot-To-Your-Server).

### Current list of commands
* !commands !command !commandlist - Displays the command list in the server chat.
* !ping - Returns the ping for communicating with the bot.
* !quote `name here` - Returns a random quote from a given member parameter.
* !rps `rock, paper, or scissors` - Plays rock, paper, scissors with the bot.
* !8ball `query` - Answers your query with a very correct 8ball reading.
* !d `integer` - Rolls an N sided dice.
* !scramble - Play a RV themed word scramble game.
* !randomcat - Sends a random cat .png using the randomcat API.