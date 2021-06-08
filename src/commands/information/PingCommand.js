const Discord = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'information', []);
  }

  async run(client, message, args) {
    message.delete()
    const msg = await message.channel.send('Pinging...').then(msg => msg.delete({timeout: 1000}));

		const latency = msg.createdTimestamp - message.createdTimestamp;

    const pingEmbed = new Discord.MessageEmbed()
    .setTitle(`Bot latency: \`${latency}ms\``)
    .setColor("#2c2f33")
    .setTimestamp();

		message.channel.send(pingEmbed);
  }
}