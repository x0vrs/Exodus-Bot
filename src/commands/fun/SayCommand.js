const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  async run(client, message, args) {
    message.delete()
    const messageToSay = args.join(" ");
    const sayEmbed = new Discord.MessageEmbed()
    .setTitle(`${message.author.tag} says: ${messageToSay}`)
    .setFooter(message.author.tag ,message.author.displayAvatarURL())
    .setColor("#2c2f33")
    .setTimestamp();
    try {
      message.channel.send(sayEmbed);
    } catch (err) {
      console.log(err);
      message.channel.send("I was unable to say that message.");
    }
  }
}