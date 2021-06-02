const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: 'idle',
        activity: {
            name: "$chasers",
            type: "WATCHING"
        }
    });
});

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	kickThreshold: 5, // Amount of messages sent in a row that will cause a ban.
	banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, **Stop spamming neek**.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}**```diff\n-held it\n```', // Message that will be sent in chat upon kicking a user.
	banMessage: '**{user_tag}** ```diff\n-held it\n```', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [804432932118855682], // Array of User IDs that get ignored.
	// And many more options... See the documentation.
});

const prefix = '£'

client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));

client.on('message', message => {

	const Embed = new Discord.MessageEmbed()
		.setColor('#000000')
		.setAuthor('You lack the permissions required.')

	if (message.content === '£verify') {

			if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I lack `MANAGE_ROLES` permissions. Pattern That.")

			const role = message.guild.roles.cache.get('849723978557161482');

			message.channel.send(`<@${message.author.id}> Verified. Redirecting...`)
			  .then(msg => {
    		  msg.delete({ timeout: 3000 })
  			  })

			message.member.roles.add(role.id).catch(err => console.log(err));
			
	}

	if (message.content === '£chasers') {

		if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed)

		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#000000')
			.setTitle(`£chasers`)
			.setDescription('paper chasing')
			.addFields(
				{ name: '**warnThreshold**', value: 'Caps set to - ``3``', inline: true },
				{ name: '**kickThreshold**', value: 'Caps set to - ``5``', inline: true },
				{ name: '**banThreshold**', value: 'Caps set to - ``7``', inline: true },
				{ name: '**maxInterval**', value: 'Caps set to - ``1000``', inline: true },
				{ name: '**maxDuplicatesWarning**', value: 'Caps set to - ``7``', inline: true },
				{ name: '**maxDuplicatesKick**', value: 'Caps set to - ``10``', inline: true },
				{ name: '**maxDuplicatesBan**', value: 'Caps set to - ``12``', inline: true },
				{ name: '**exemptPermissions**', value: '``ADMINISTRATOR``', inline: true },
				{ name: '**ignoreBots**', value: '``true``', inline: true },
				{ name: '**ignoredUsers**', value: '``paid#4444``', inline: true },

			)
			.setImage('https://lifehacker.ru/wp-content/uploads/2018/04/ezgif.com-optimize-5-copy_1523971072.gif')
			.setTimestamp()

		message.channel.send(exampleEmbed);
	}
});

client.on('message', (message) => antiSpam.message(message));

client.on(`message`, async message => {
	const link = new Discord.MessageEmbed()
		.setColor('#000000')
		.setTitle(`£chasers`)
		.setDescription(` <@${message.author.id}> no links lol`)
		.setTimestamp()

	const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`, ` gg `]
	try {
		if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
			if (message.author.id === message.guild.ownerID) return;
			await message.delete();
			await message.channel.send(link);
		}
	} catch (e) {
		console.log(e);
	}
});

client.on('guildMemberAdd', (member) => {

	const channelId = '849724986390216724' // welcome channel
    const welcEmbed = new Discord.MessageEmbed()
		.setColor('#000000')
		.setTitle('Welcome')
		.setDescription(` <@${member.id}> to £chasers`)
		.setThumbnail(${member.avatarURL})
		.setTimestamp()


    const channel = member.guild.channels.cache.get(channelId)
    channel.send(welcEmbed)
  })

client.login(process.env.token);
