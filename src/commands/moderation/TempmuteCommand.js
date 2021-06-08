const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the permissions to use this command.");
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send("I do not have the \`MUTE_MEMBERS\` permission.");

    const muteRole = message.guild.roles.cache.get(`850547568487694346`);
    const memberRole = message.guild.roles.cache.get(`818616564487946310`);
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(1).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .addField(`Duration: ${time}`, `Reason: ${reason}`)
      .setColor("#2c2f33")
      .setTimestamp();

    if (!args[0]) return message.channel.send("Please specify a user to tempmute. \`x?tempmute @user {time} {reason}\`");
    if (!mentionedMember) return message.channel.send("The user specified is not in this guild.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("You are unable to tempmute yourself.");
    if (mentionedMember.user.id == client.user.id) return message.channel.send("You are unable to tempmute me.");
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send("The specified user is already muted.");
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("You do not have the permissions to tempmute a higher class role.");
    if (!time)  return message.channel.send("Please specify a duration of time.");

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
      await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
      await mentionedMember.send(`Your mute has been lifted in ${message.guild.name}`).catch(err => console.log(err));
    }, ms(time));
  }
}