var Discord = require('discord.io');
var spawn = require('child_process').spawn;
var bot = new Discord.Client({
  token: "",
  autorun: true,
  email: "corleonisbot@gmail.com",
  password: "ApplesForSale"
});

//var serverName = "Cor Leonis [LEO]";
var serverName = "TybaltTestingServer";
var server;
var serverRoles;

//first version will only have 2 authorization levels: officers, and everyone else
var officerRoles = ["officer", "leader"];

bot.on('ready', function() {

  server = findServerByName(serverName);
  if(server === null)
  {
    console.log("Server not found! Shutting down");
    process.exit();
  }
  listChannels(server);
  serverRoles = server.roles;

  for(roleid in serverRoles)
  {
    console.log("role: " + serverRoles[roleid].name);
  }

});


bot.on("message", function(user, userID, channelID, message, event) {
  if(user === "Tybalt Leftpaw") return;

  console.log("\nReceived Message: \n" + user + ": \"" + message + "\"\n");

  //commands
  if(message.startsWith('!'))
  {
    var isUserOfficer = false;  //if true allows extra commands to be used

    //first we need to find the ids for an officer role (maybe something to do at launch?)
    var officerRoleID = null;
    for(roleid in serverRoles)
    {
      if(serverRoles[roleid].name == "officer")
      {
        console.log("role exists! - " + roleid);
        officerRoleID = roleid;
      }
    }

    console.log("officerRoleID: " + officerRoleID);

    //next get the current member object
    var members = server.members;
    var userRoles = members[userID].roles;

    //test if the user issuing a command is an officer
    if(userRoles.indexOf[officerRoleID] != -1)
    {
      isUserOfficer = true;
    }



    message = message.substr(1);
    if(message === "off")
    {
      bot.disconnect();
    }
    else if(message === "rules")
    {
      if(!isUserOfficer)
      {
        bot.sendMessage({
          to: channelID,
          message: "you need to be an officer to use this command, " + user
        });
        return;
      }
      bot.sendMessage({
        to: channelID,
        message: "Cor Leonis [LEO] rules and Guidelines\n1. Respect others\n2. uh...I forgot"
      });
    }

    /*if(message ==="play")
    {
      if(voiceChannelReady)
      bot.getAudioContext({channel: voiceChannelID, stereo: true}, startSong);
    }

    if(message === "stop")
    {
      if(voiceChannelReady)
      bot.getAudioContext({channel: voiceChannelID, stereo: true}, stopSong);
    }*/
  }
});

bot.on('disconnected', function() {
  console.log("Disconnected, exiting!");
  process.exit();
});


///
/// UTILITY FUNCTIONS
///

function listChannels(server) {
    var channels = server.channels;
    console.log("\nListing channels for server \"" + server.name + "\"");
    console.log("Text Channels:")
    for(var i in channels) {
      if(channels[i].type === 'text') {
        console.log(channels[i].name + " [" + i + ']');
      }
    }
    console.log("Voice Channels:")
    for (var i in channels) {
        if (channels[i].type === 'voice') {
            console.log(channels[i].name + " [" + i + ']');
        }
    }
}

//find a server object by name.
//Node this does not give you the server ID, but the etire object
function findServerByName(serverName) {
  console.log("Searching for server \"" + serverName + "\"");
  for(server in bot.servers)
  {
    if(bot.servers[server].name === serverName)
    {
      console.log("server found!");
      return bot.servers[server];
    }
  }
}

//find a channel object by name.
//Node this does not give you the channel ID, but the etire object
function findVoiceChannelByName(server, channelName) {
  console.log("\nSearching for channel \"" + channelName + "\" in server \"" + serverName + "\"");
  var channels = server.channels;
  for(channel in channels)
  {
    if(channels[channel].type === 'voice')
    {
      if(channels[channel].name === channelName)
      {
        console.log("Voice Channel found!");
        return channels[channel];
      }
    }
  }
}


//////////////////////////
//Audio Testing
/////////////////
function handleStream(stream) {
	var ffmpeg = spawn('ffmpeg' , [ //Or 'avconv', if you have it instead
		'-i', file,
		'-f', 's16le',
		'-a0r', '48000',
		'-ac', '2', //If you want one audio channel (mono), you can omit `stereo: true` in `getAudioContext`
		'pipe:1'
	], {stdio: ['pipe', 'pipe', 'ignore']});

	ffmpeg.stdout.once('readable', function() {
		stream.send(ffmpeg.stdout);
	});

	ffmpeg.stdout.once('end', function() {
		//The file's done
	});
}

function startSong(stream) {
  stream.stopAudioFile();
  stream.startAudioFile(file);
}

function stopSong(stream) {
  stream.stopAudioFile();
}
