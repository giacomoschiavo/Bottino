const oneLinerJoke = require("one-liner-joke");

module.exports = {
   name: "joke",
   aliases: ["pun"],
   execute(message, args) {
      let limit = false;
      if(args[0] == "nolimit") limit = true;
      const getRandomJoke = limit ? oneLinerJoke.getRandomJoke({
         'exclude_tags': ['dirty', 'racist', 'marriage']
      }) : oneLinerJoke.getRandomJoke({ "exclude_tags": [] });
      return message.reply(getRandomJoke.body);
   }
}