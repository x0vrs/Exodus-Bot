const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You do not have the permissions to use this command.");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I do not have the \`MANAGE_NICKNAMES\` permission.");

    //Variables:
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    //Input Checking:
    if (!args[0]) return message.channel.send("Please specify a user to change their nickname.");
    if (!mentionedMember) return message.channel.send("The user specified is not in this guild.");
    if (!nickName) return message.channel.send("Please specify a nickname for the user.");
    if (!mentionedMember.kickable) return message.channel.send("I was unable to change that users nickname. Please ensure my role is above the specified user.");

    //Executing:
    await mentionedMember.setNickname(nickName).catch(err => console.log(err)) && message.channel.send("I ran into some issues while attempting to change that users nickname.");
  }
}