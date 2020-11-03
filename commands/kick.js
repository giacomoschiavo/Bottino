module.exports = {
   name: "kick",
   description: "",
   execute(message, args) {
      if(!message.mentions.users.size) 
         return message.reply("Hai bisogno di menzionare qualcuno :/")
      const taggerUser = message.mentions.users.first();
      message.channel.send(`You wanted to kick: ${taggerUser.username}`);
   }
}