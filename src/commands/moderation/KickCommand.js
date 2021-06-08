const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permissions to use this command.")
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given.";

    const kickEmbed = new Discord.MessageEmbed()
    .setTitle(`You were kicked from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("#2c2f33")
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    // {prefix}kick @user {reason}
    if (!args[0]) return message.channel.send("Please specify a user to kick. \`x?kick @user {reason}\`");
    if (!mentionedMember.kickable) return message.channel.send("I was unable to kick the user specified.");
    try {
      await mentionedMember.send(kickEmbed);
      message.channel.send("User was kicked." + `Reason: ${reason}`)
    } catch (err) {
      console.log('I was unable to message the user.')
    }
    try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err);
      message.channel.send("I was unable to kick that user.");
    }
  }
}