var Discord = require("discord.js");

var Tybalt = new Discord.Client();
Tybalt.on("connected", function()
{
    console.log("Connected!");
}
);

Tybalt.on("disconnected", function()
{
  console.log("Disconnected, exiting!");
  process.exit();
}
);

Tybalt.on("message", function(message)
{
  //if we're dealing with a command
  if(message.content.startsWith("!"))
  {

    //if its a command, cut off the "!", we don't need it anymore
    message.content = message.content.substr(1);



    if(message.content == "off")
    {
      console.log(message.server);
      console.log(message);
      Tybalt.logout();
    }
    else if(messge.content == "joke")
    {
      tellAJoke(message);
    }

    var command = message.content.split(" ");
    console.log(command);
    if(command[0] == "echo")
    {
      console.log(command);
      //var response = command.splice(1, 0, );
      //response.concat
      Tybalt.reply(message, command[1]);
    }
  }
  else {

  }

}
);

function tellAJoke(message)
{
  Tybalt.reply(message, "The Order of Whispers, the Durmand Priory, and the Vigil walk into a bar");
  Tybalt.reply(message, "It sure was pact!");
}

Tybalt.login("corleonisbot@gmail.com", "ApplesForSale");
