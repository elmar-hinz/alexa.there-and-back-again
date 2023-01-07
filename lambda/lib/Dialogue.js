const fetch = require('node-fetch');
const MessageQueue = require('./MessageQueue');

class Dialogue {

    remote;
    messageQueue = new MessageQueue();

    load() {
        return this.remote.loadMessages().then((messages) => {
            for (const message of messages) {
                this.messageQueue.add(message);
            }
            return this.messageQueue;
        });
    }
}

module.exports = Dialogue;