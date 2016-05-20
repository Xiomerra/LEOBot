var Discord = require("discord.js");

var Tybalt = new Discord.Client();

Tybalt.on("message", function(message)
{
  console.log(message.channel);
  if(message.author.username != "Tybalt Leftpaw")
  {
    Tybalt.reply(message, message.content);
  }

  if(typeof(message.channel) === "PMChannel")
  {
    Tybalt.reply(message, "PMChannel");
    if(memberHasRole(message.author.username, "Leader") && message.content === "goodnight")
    {
      Tybalt.reply(message, "Goodnight, " + message.author.username);
      //Tybalt.logout();
    }
    else
    {
      Tybalt.reply(message, "not a leader");
    }

  }
  else if(typeof(message.channel) === "TextChannel")
  {
    Tybalt.reply(message, "TextChannel");
    if(message.content === "Hi")
    {
      Tybalt.reply(message, "Hey there!");
    }
  }

  if(message.content == "off")
  {
  Tybalt.logout();
  }
}
);

Tybalt.login("corleonisbot@gmail.com", "ApplesForSale");
