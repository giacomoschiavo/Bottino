module.exports = {
  name: "stoic",
  aliases: ["wisdom", "pearl of wisdom"],
  execute: (message, args) => {
    const wisdomText = require("stoic-api").random();
    // const translate = require("translate");
    // translate(wisdomText, "it")
    //   .then((text) => message.reply(text))
    //   .catch((err) => {
    //     console.log(err);
    //   });
    return message.reply(wisdomText);
  },
};
