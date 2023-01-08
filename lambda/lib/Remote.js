const fetch = require('node-fetch');

class Remote {

    stateUrl;
    bearerToken = '';

    loadState() {
        const options = { headers: {} };
        if (this.bearerToken !== '') {
            options.headers.Authorization = `Bearer ${this.bearerToken}`
        }
        return fetch(this.stateUrl, options)
            .then(res => res.json())
            .then((json => { return JSON.parse(json.state); }))
            .catch((err) => { console.log('Err: ', err.message); });
    }

}

module.exports = Remote