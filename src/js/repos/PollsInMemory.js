import Q from "q";
import _ from "underscore";
import { Poll } from "../models/Poll";
import App from "../App";

export default class PollsInMemory {
    constructor() {
        this._polls = [new Poll({ title: "Lunch" })];
    }

    fetchFirst() {
        var d = Q.defer();

        var poll = _.first(this._polls);
        if (poll) {
            d.resolve(poll);
        } else {
            d.reject(new Error("No polls"));
        }

        return d.promise;
    }

    fetchById(id) {
        var d = Q.defer();

        var poll = _.findWhere(this._polls, { id: id });
        if (poll) {
            d.resolve(poll);
        } else {
            d.reject(new Error("Could not find Poll"));
        }

        return d.promise;
    }
}
