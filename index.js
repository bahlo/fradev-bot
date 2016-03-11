var Botkit = require('botkit'),
    helper = require('./helper.js');

// Create controller
var controller = Botkit.slackbot({
  debug: process.env.DEBUG == '1'
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
    return;
  }

  var user     = message.user,
      message  = 'Hi <@' + user.id + '> and welcome to Frankfurt Developers!';

  // Add question to complete profile
  if (user.real_name == '') {
    message += '\nCan you please add your real name to your profile?';
  }

  bot.say({
    text:       message,
    channel:    generalID,
    link_names: 1
  });
});

// Answer to hello/hi/hey
controller.hears('(.*)', ['direct_message','direct_mention','mention'],
  function(bot, message) {
  var replies = [
    'Beep bop.',
    'Beedeleedop meep!',
    'I\'m not the droid, you\'re looking for – wait, I don\'t have the force.',
    'Bip beedep?',
    'Beep beedeleedop.'
  ];

  bot.reply(message, {
    text: helper.randomElement(replies)
  });
});
