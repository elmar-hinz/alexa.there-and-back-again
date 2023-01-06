class MessageQueue {

    #map;

    constructor(height, width) {
        this.#map = new Map();
    }

    clear() {
        this.#map.clear();
    }

    length() {
        return this.#map.size;
    }

    add(item) {
        if (this.get(item.id) === undefined) {
            this.#map.set(item.id, item);
        }
    }

    get(id) {
        return this.#map.get(id);
    }

    remove(item) {
        this.#map.delete(item.id);
    }

    peek() {
        return this.#map.values().next().value;
    }

    shift() {
        const item = this.peek();
        if (item !== undefined) {
            this.remove(item);
        }
        return item;
    }

    forEach(callback) {
        return this.#map.forEach(callback);
    }

}

module.exports = MessageQueue;