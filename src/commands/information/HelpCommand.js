const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'information', []);
  }


  async run(client, message, args) {
    message.delete()

    const sectionEmbed = new Discord.MessageEmbed()
    .setTitle('Exodus Help Categories')
    .setDescription('Use x?help {categoryName} to access a specific category.\n \n**Sections:**\ninformation\nfun\nmoderation\nuility')
    .setColor("#2c2f33")
    .addField('Fun Commnds', 'Commands that all uesrs can run that are for fun and have no purpose.')
    .addField('Information Commands', 'Commands that return some form of important information.')
    .addField('Moderation Commands', 'Commands that are for moderation purposes by the administration team.')
    .addField('Utility Commands', 'Commands that return information that could prove useful.')
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    const infoEmbed = new Discord.MessageEmbed()
    .setTitle('Information Commands.')
    .setColor("#2c2f33")
    .addField('Help Command', 'This command displays all executable commands.')
    .addField('Ping Command', 'This command displays the bots latency.')
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    const utilityEmbed = new Discord.MessageEmbed()
    .setTitle('Utility Commands.')
    .setColor("#2c2f33")
    .addField('Serverinfo Command', 'This command displays all information available about a guild.')
    .addField('Userinfo Command', 'This command displays all information available about a user.')
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    const funEmbed = new Discord.MessageEmbed()
    .setTitle('Information Commands.')
    .setColor("#2c2f33")
    .addField('Avatar Command', 'This command displays a users avatar.')
    .addField('say Command', 'This command returns a message that the user wishes.')
    .addField('Snipe Command', 'This command retrieves the most recent deleted message.')
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    const moderationEmbed = new Discord.MessageEmbed()
    .setTitle('Moderation Commands.')
    .setColor("#2c2f33")
    .addField('Ban Command', 'Bans a user from the server.')
    .addField('Unban Command', 'Unbans a user from the server.')
    .addField('Kick Command', 'Kicks a user from the server.')
    .addField('Nickname Command', 'Changes a users nickname.')
    .addField('Purge Command', 'Purges a set of messages.')
    .addField('Mute Command', 'Mutes a user.')
    .addField('Unmute Command', 'Unmutes a user.')
    .addField('Tempmute Command', 'Tempmutes a user for a specifed amount of time.')
    .addField('Role Command', 'Add or remove a role from a mentioned user.')
    .addField('Slowmode Command', 'Set the slowmode for the channel.')
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    if (!args[0]) return message.channel.send(sectionEmbed);
    if (args[0] == 'information') return message.channel.send(infoEmbed);
    else if (args[0] == 'fun') return message.channel.send(funEmbed);
    else if (args[0] == 'moderation') return message.channel.send(moderationEmbed);
    else if (args[0] == 'utility') return message.channel.send(utilityEmbed);
  }
}