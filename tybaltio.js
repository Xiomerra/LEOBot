var Discord = require('discord.io');
var spawn = require('child_process').spawn; //why do we need this?
var bot = new Discord.Client({
  token: "",
  autorun: true,
  email: "corleonisbot@gmail.com",
  password: "ApplesForSale"
});

var serverName = "Cor Leonis [LEO]"; //"TybaltTestingServer";
var voiceChannelName = "General";
var file = "testmp3.mp3";

bot.on('ready', function() {
  //
  var LEOServer = findServerByName("Cor Leonis [LEO]");
  listVoiceChannels(LEOServer);

  var server = findServerByName(serverName);
  var voiceChannelID = findVoiceChannelByName(server, voiceChannelName).id;


  bot.joinVoiceChannel(voiceChannelID, function() {
    bot.getAudioContext({channel: voiceChannelID, stereo: true}, handleStream);
  });
});

function handleStream(stream) {
	var ffmpeg = spawn('ffmpeg' , [ //Or 'avconv', if you have it instead
		'-i', file,
		'-f', 's16le',
		'-ar', '48000',
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

bot.on('message', function(user, userID, channelID, message, event) {
  if(message === "ping") {
    bot.sendMessage({
      to: channelID,
      message: "pong"
    });
  }

  //commands
  if(message.startsWith('!'))
  {
    console.log(userID);
    console.log("------------------------------");
    console.log(findServerByName(serverName));
    console.log("=============================");
    roles = findServerByName(serverName).roles;
    console.log(roles);

    for(role in roles)
    {
      console.log(roles[role]);
    }
    message = message.substr(1);
    if(message === "off")
    {
      bot.disconnect();
    }
  }
});

bot.on('disconnected', function()
{
  console.log("Disconnected, exiting!");
  process.exit();
});


///
/// UTILITY FUNCTIONS
///

function listVoiceChannels(server) {
    var channels = server.channels;
    for (var i in channels) {
        if (channels[i].type === 'voice') {
            console.log(i + " - " + channels[i].name);
        }
    }
}

//find a server object by name.
//Node this does not give you the server ID, but the etire object
function findServerByName(serverName)
{
  for(server in bot.servers)
  {
    if(bot.servers[server].name === serverName)
    {
      console.log("server found: " + server + ", " + serverName);
      return bot.servers[server];
    }
  }
}

//find a channel object by name.
//Node this does not give you the channel ID, but the etire object
function findVoiceChannelByName(server, channelName)
{
  var channels = server.channels;
  for(channel in channels)
  {
    if(channels[channel].type === 'voice')
    {
      if(channels[channel].name === channelName)
      {
        console.log("Voice Channel found: " + channels[channel] + ", " + channelName);
        return channels[channel];
      }
    }
  }
}
