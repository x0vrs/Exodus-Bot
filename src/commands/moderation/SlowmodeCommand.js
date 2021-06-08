const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have the permission to set slowmode.");
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I do not have the \`MANAGE_CHANNELS\` permission.");

    const value = Number(args[0]);

    if (!args[0]) return message.channel.send("Please specify a value to set the slowmode timeframe.");
    if (!value || value < 5 || value > 21600 ) return message.channel.send("Please specify a value between `5` and `21600`.");
    try {
      await message.channel.setRateLimitPerUser(value);
      message.channel.send(`The slowmode for ${message.channel} is set to ${value}.`);
    } catch (err) {
      console.log(err);
      message.channel.send("I ran into some issues while attempting to set the slowmode.")
    }
  }
}