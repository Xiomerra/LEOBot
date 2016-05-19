var Discord = require("discord.js");

var Tybalt = new Discord.Client();

Tybalt.on("message", function(message)
{
  if(message.content === "Hi")
  {
    Tybalt.reply(message, "Hey there!");
  }
});

Tybalt.login("corleonisbot@gmail.com", "ApplesForSale");
