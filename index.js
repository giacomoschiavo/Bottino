const fs = require("fs");
const Discord = require('discord.js');
const {prefix} = require("./config.json");

const cooldowns = new Discord.Collection();

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

   if(!client.commands.has(commandName)) return message.channel.send(`!${commandName} non esiste :(`);

   const command = client.commands.get(commandName);

   if(command.guildOnly && message.channel.type === "dm") {
      return message.reply("Non posso eseguire questo comando nei dm! :I");
   }

   if(command.args && !args.length) {
      let reply = `Non hai dato argomenti per !${command.name}, ${message.author}`;

      if(command.usage) {
         reply += `\nL'utilizzo corretto prevede: \'${prefix}${command.name} ${command.usage}`;
      }

      return message.channel.send(reply);
   }

   if(!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
   }

   const now = Date.now();
   const timestamps = cooldowns.get(command.name);
   const cooldownAmount = (command.cooldown || 3) * 1000;

   if(timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if(now < expirationTime) {
         const timeLeft = (expirationTime - now) / 1000;
         return message.reply(`per favore, aspetta ancora ${timeLeft.toFixed(1)} secondi prima di riutilizzare ${command.name}`);
      } 
   } else {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
   }

   try {
      command.execute(message, args);
   } catch(error) {
      console.log(error);
      message.reply(`Errore nel risolvere !${commandName}`);
   }
});