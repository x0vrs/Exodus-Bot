// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const welcomeChannel = member.guilds.channel.cache.get('849724986390216724');
    welcomeChannel.send(`<@${member.user.id}>, Welcome to ${member.guild.name}.`);
  }
}