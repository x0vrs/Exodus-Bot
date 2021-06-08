const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the permissions to mute.");
    if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send("I do not have the \`MUTE_MEMBERS\` permission.");

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get(`851845229119143956`);
    const memberRole = message.guild.roles.cache.get(`849723978557161482`);
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#2c2f33")
      .setTimestamp();

    if (!args[0]) return message.channel.send("\`x?mute @user {reason}\`");
    if (!mentionedMember) return message.channel.send("The user specified is not in this guild.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("You are unable to mute yourself.");
    if (mentionedMember.user.id == client.user.id) return message.channel.send("You are unable to mute me.");
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send("The specified user is already muted.");
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("You do not have the permissions to mute a higher class role.");

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err)).then(message.channel.send("I ran into some issues while attempting to mute that user."));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err)).then(message.channel.send("I ran into some issues while attempting to mute that user."));

  }
}