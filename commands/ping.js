module.exports = {
   name: "ping",
   cooldown: 5,
   execute(message, args) {
      return message.channel.send("pong!");
   }
}