var Botkit = require('botkit');

// Create controller
var controller = Botkit.slackbot({
  debug: true
});

// Create bot
var bot = controller.spawn({ token: process.env.SLACK_TOKEN })

// General channel
var generalID;

// Connect
bot.startRTM(function(err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }

  // Find the id of the general channel
  for (var i = 0; i < payload.channels.length; i++) {
    var channel = payload.channels[i];
    if (channel.name == 'general') {
      generalID = channel.id;
      break;
    }
  }
});

// Listen on new team members
controller.on('team_join', function(bot, message) {
  if (!generalID) {
    console.error("No ID for #general known");
  }

  var user = message.user;
  var message ='Hi @' + user.name + ' and welcome to Frankfurt Developers!';

  // Add question to complete profile
  if (user.real_name == '') {
    message += '\nCan you please add the real name to your profile?';
  }

  bot.say({
    text:    message,
    channel: generalID
  });
});
