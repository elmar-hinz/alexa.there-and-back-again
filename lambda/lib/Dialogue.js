class Dialogue {

    remote;

    // returns an empty promise, just promising to finish eventually
    load() {
        return this.remote.loadState().then((message) => {
            return message.text;
        });
    }

}

module.exports = Dialogue;