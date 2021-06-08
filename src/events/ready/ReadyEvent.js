const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    let serverIn = await client.guilds.cache.size;
    console.log(client.user.tag + ' has logged in.');
    client.user.setPresence({
      activity: {
        name: `£`,
        type: "WATCHING"
      },
      status: 'idle'
    })
    .catch(console.error)
  }
}