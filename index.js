var Botkit = require('botkit');

// Create controller
var controller = Botkit.slackbot({
  debug: true
});

// Create bot
var bot = controller.spawn({ token: process.env.SLACK_TOKEN })

// Connect
bot.startRTM(function(err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

// Listen on new team members
controller.hears('team_join', function(bot, message) {
  var user = message.user;
  var message ='Hi @' + user.name + ' and welcome to Frankfurt Developers!';

  // Add question to complete profile
  if (user.profile.first_name == '' || user.profile.last_name == '') {
    message += '\nCan you please add the real name to your profile?';
  }

  body.say({
    text:    message,
    channel: 'general'
  })
});
