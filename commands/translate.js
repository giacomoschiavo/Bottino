module.exports = {
  name: "translate",
  aliases: ["traduci", "t"],
  execute: (message, args) => {
    const translate = require("translate");
    const text = args.join(" ");
    translate(text, { to: "it", engine: "libre" })
      .then((text) => {
        return message.channel.send(text);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
