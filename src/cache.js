class Cache{
    constructor() {
        this.cache = {};
        this.stats = [];
    }

    add(new_key, new_value, new_freq=1) {
        if (typeof new_key !== 'string')
            throw new TypeError('Key must be string');
        if (typeof new_freq !== 'number')
            throw new TypeError('Frequency must be number');
        if (new_freq < 0)
            throw new Error('Frequency must be equal or greater 0');
        if (!Number.isInteger(new_freq))
            throw new Error('Frequency must be integer number');
        this.cache[new_key] = {value: new_value, freq: new_freq}
        this.stats.push(`New key was added. Key: '${new_key}', value: '${new_value}', remaining requests number: ${new_freq}`);
    }

    get_value(key) {
        if (typeof key !== 'string')
            throw new TypeError('Key must be string');
        if (!(key in this.cache)) {
            return null;
        }
        let response = this.cache[key];
        if (response.freq == 0) {
            this.stats.push(`Value was requested by key. Key: '${key}', value: '${response.value}', remaining requests number: ${response.freq}`);
            return null;
        }
        response.freq--;
        this.stats.push(`Value was requested by key. Key: '${key}', value: '${response.value}', remaining requests number: ${response.freq}`);
        return response.value;
    }

    get_freq(key) {
        if (typeof key !== 'string')
            throw new TypeError('Key must be string');
        if (!(key in this.cache)) {
            return null;
        }
        let response = this.cache[key];
        this.stats.push(`Remaining requests number was requested by key. Key: '${key}', value: '${response.value}', remaining requests number: ${response.freq}`);
        return response.freq;
    }

    get_stats() {
        return this.stats.join('\n');
    }
}
export {Cache}