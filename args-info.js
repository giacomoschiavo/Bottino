module.exports = {
   name: "args-info",
   description: "return list of args",
   execute(message, args) {
      message.channel.send(`Il comando usato: ${command}\nArgomenti: ${args}`);
   }

};