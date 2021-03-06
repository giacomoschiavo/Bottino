module.exports = {
   name: "avatar",
   aliases: ["icon", "pfp"],
   description: "",
   execute(message, args) {
      if(!message.mentions.users.size){ 
         return message.channel.send(`Il tuo avatar: <${message.author.displayAvatarURL({format: "png", dynamic: true})}>`);
      }

      const avatarList = message.mentions.users.map(user => `${user.username}'s avatar: <${user.displayAvatarURL({format: "png", dynamic: true})}>`);
      return message.channel.send(avatarList);
   }
}