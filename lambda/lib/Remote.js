const fetch = require('node-fetch');

class Remote {

    messagesUrl;

    loadMessages() {
        return fetch(this.messagesUrl, {})
            .then(res => res.json())
            .then((json => { return json.messages; }))
            .catch((err) => { console.log('Err: ', err.message); });
    }

    deleteMessage() {

    }

}

module.exports = Remote;