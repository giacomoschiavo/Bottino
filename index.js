const fs = require("fs");
const Discord = require('discord.js');
const {prefix} = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for(const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.name, command);
}

client.once('ready', () => {
   console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on("message", message => {
   if(!message.content.startsWith(prefix) || message.author.bot) return;
   
   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   if(!client.commands.has(commandName)) return;

   const command = client.commands.get(commandName);

   if(command.args && !args.length) {
      return message.channel.send(`Non hai dato argomenti, ${message.author}`);
   }

   try {
      command.execute(message, args);
   } catch(error) {
      console.log(error);
      message.reply(`Errore nel risolvere il comando ${commandName}`);
   }
   
   // if(command === "avatar") {
   //    if(!message.mentions.users.size){ 
   //       return message.channel.send(`Il tuo avatar: <${message.author.displayAvatarURL({format: "png", dynamic: true})}>`);
   //    }

   //    const avatarList = message.mentions.users.map(user => `${user.username}'s avatar: <${user.displayAvatarURL({format: "png", dynamic: true})}>`);
   //    return message.channel.send(avatarList);
   // }

   // if(command === "prune") {
   //    const amount = parseInt(args[0]) + 1;

	// 	if (isNaN(amount)) {
	// 		return message.reply('that doesn\'t seem to be a valid number.');
	// 	} else if (amount <= 1 || amount > 100) {
	// 		return message.reply('you need to input a number between 1 and 99.');
	// 	}

	// 	message.channel.bulkDelete(amount, true).catch(err => {
	// 		console.error(err);
	// 		message.channel.send('there was an error trying to prune messages in this channel!');
	// 	});
   // }
});