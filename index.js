const fs = require("fs");
const Discord = require('discord.js');
const {prefix} = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

client.once('ready', () => {
   console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);


client.on('message', msg => {
   if(!msg.content.startsWith(prefix) || msg.author.bot) return;
   
   const args = msg.content.slice(prefix.length).trim().split(/ +/);
   const command = args.shift().toLowerCase();

   if(command === "kick") {
      if(!msg.mentions.users.size) 
         return msg.reply("Hai bisogno di menzionare qualcuno :/")
      const taggerUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggerUser.username}`);
   }

});

client.on('message', msg => {
   if(!msg.content.startsWith(prefix) || msg.author.bot) return;
   
   const args = msg.content.slice(prefix.length).trim().split(/ +/);
   const command = args.shift().toLowerCase();

   if(command === "avatar") {
      if(!msg.mentions.users.size){ 
         return msg.channel.send(`Il tuo avatar: <${msg.author.displayAvatarURL({format: "png", dynamic: true})}>`);
      }

      const avatarList = msg.mentions.users.map(user => `${user.username}'s avatar: <${user.displayAvatarURL({format: "png", dynamic: true})}>`);
      return msg.channel.send(avatarList);
   }

});

client.on("message", message => {
   if(!message.content.startsWith(prefix) || message.author.bot) return;

   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const command = args.shift().toLowerCase();
   if(command === "prune") {
      const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
   }

});