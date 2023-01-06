const fetch = require('node-fetch');
const MessageQueue = require('./MessageQueue');

class Dialogue {

    token = "";
    url = "";
    verify = false;
    messsageQueue = new MessageQueue();

    load() {
        const url = `${ this.url }/api/taba/msgs`;
        return fetch(url, {})
            .then(res => res.json())
            .then((json => {
                for (const msg of json.msgs) {
                    this.messsageQueue.add(msg);
                }
                return this.messsageQueue;
            }))
            .catch((err) => {
                console.log('ErrorX: ', err.message);
            });
    }
}

module.exports = Dialogue;