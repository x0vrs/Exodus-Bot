const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permissions to unban.");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have the \`BAN_MEMBER\` permission.");

    //Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];

    //Input Checking:
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send("Please specify a user to unban. \`x?unban ID {reason}\`");
    if(isNaN(args[0])) return message.channel.send("The value specified is not a valid ID. \`x?unban ID {reason}\`");

    //Executing:
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send("This guild does not have any banned users.");
      let bUser = bans.find(b => b.user.id == userID); 
      if (!bUser) return message.channel.send("The user specified is not banned."); 
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.send("Something went wrong while attempting to unban the ID specified.");
      }).then(() => {
        message.channel.send(`${args[0]} has been unbanned.`)
      });
    });
  }
}