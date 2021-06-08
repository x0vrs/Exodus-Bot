const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('role', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have the permissions to manage roles.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have the \`MANAGE_ROLES\` permission.");

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guilds.roles.cache.get(args[1]);

    if (!args[0]) return message.channel.send("Please specify a user to give a role to.");
    if (!mentionedMember) return message.channel.send("The user specified is not in this guild.");
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You are unable to add roles to users of a higher rank.");
    if (args[1]) return message.channel.send("Please specify a role to give to the user mentioned.")
    if (!role) return message.channel.send("The role specified does not exist.")
    if (message.member.roles.highest.position <= role.position) return message.channel.send("You are unable to add roles to users of a higher rank.");

    await mentionedMember.roles.add(role.id).catch(err => console.log(err));
  }
}

