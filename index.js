const Discord = require('discord.js');
const {prefix, token} = require("./config.json");
const client = new Discord.Client();

client.once('ready', () => {
   console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
   if(message.content === `${prefix}ping`) {
      message.channel.send("pang!");
   } 
   if(message.content.startsWith(`${prefix}meaning of life`)) {
      message.channel.send(config.meaning_of_life);
   }
});

