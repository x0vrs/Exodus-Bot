const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the permissions to purge.");
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have the \`MANAGE_MESSAGES\` permission.");
    if (!args[0]) return message.channel.send("Please specify a number of messages to purge. \`x?purge {value}\`");

    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send("The value specified is not a valid number.");
    if (!Number.isInteger(amountToDelete)) return message.channel.send("The value specified must be a whole number.");
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send("The value specified must be between \`2\` and \`100\`.");
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)   
    } catch (err) {
      console.log(err);
      message.channel.send("I was unable to delete the value specified. Please ensure the messages are within 14 days old.");
    }
  }
}