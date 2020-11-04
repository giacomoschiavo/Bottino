module.exports = {
   name: "argsinfo",
   description: "return list of args",
   args: true,
   execute(message, args) {
      message.channel.send(`Argomenti: ${args}`);
   }

};