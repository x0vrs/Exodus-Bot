const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permissions to ban.");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have the \`BAN_MEMBER\` permission.");

    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Input Checking:
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send("Please specify a user to ban. \`x?ban @user {reason}\`");
    if (!mentionedMember) return message.channel.send("The user specified is not in this guild.");
    if (!mentionedMember.bannable) return message.channel.send("I was unable to ban that user.");

    //Executing:
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}.`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#2c2f33")
      .setTimestamp();

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban ({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send(mentionedMember.user.tag + "has been banned."));
  }
}