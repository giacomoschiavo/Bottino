const {phasmo} = require("../config.json");
module.exports = {
   name: "phasmo",
   description: "un comando per invocare i cacciatori di fantasmi!",
   args: true,
   async execute(message, args) {
      if(args.length > 1) return message.channel.send("Troppi argomenti :0");
      const command = args[0];
      if(command === "appid" || command === "code" || command === "link") {
         return message.channel.send(`il codice è:\n${phasmo.appid_phasmo}`)
      }
   }
}