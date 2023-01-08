const fetch = require('node-fetch');

class Remote {

    stateUrl;
    bearerToken;

    loadState() {
        return fetch(this.stateUrl, {})
            .then(res => res.json())
            .then((json => { return JSON.parse(json.state); }))
            .catch((err) => { console.log('Err: ', err.message); });
    }

}

module.exports = Remote;