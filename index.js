const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");
const prefix = config.prefix;
// salva cooldown per ogni funzione
const cooldowns = new Discord.Collection();

// salva tutti i comandi disponibili in client.commands
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// inizializzazione connessione bot
client.once("ready", () => {
  console.log("Ready!");
});
client.login(process.env.BOT_TOKEN).catch((err) => console.log(err));

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // controllo comando inserito se presente tra i disponibili (controllo alias)
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return message.channel.send(`!${commandName} non esiste :(`);

  // controllo uso in gruppi (se in dm meglio evitare)
  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("Non posso eseguire questo comando nei dm! :I");
  }

  // controllo argomenti per chi li richiede necessari
  if (command.args && !args.length) {
    let reply = `Non hai dato argomenti per !${command.name}, ${message.author}`;
    if (command.usage) {
      reply += `\nL'utilizzo corretto prevede: \'${prefix}${command.name} ${command.usage}`;
    }
    return message.channel.send(reply);
  }

  // gestione cooldowns (default 3 secondi)
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  // default cooldown di 3 secondi
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    // calcolo scadenza
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `per favore, aspetta ancora ${timeLeft.toFixed(
          1
        )} secondi prima di riutilizzare ${command.name}`
      );
    }
  } else {
    timestamps.set(message.author.id, now);
    // dopo cooldown elimina comando dalla lista
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  // esegui funzione (gestisce errore)
  try {
    command.execute(message, args);
  } catch (error) {
    console.log(error);
    message.reply(`Errore nel risolvere !${commandName}`);
  }
});
