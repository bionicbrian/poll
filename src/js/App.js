
var state = {};

export default class App {
    static set(prop, val) {
        state[prop] = val;
    }

    static get(prop) {
        return state[prop];
    }
};
