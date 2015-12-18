import Q from "q";
import _ from "underscore";
import { Poll } from "../models/Poll";

var polls = [new Poll({ title: "Lunch" })];

export class PollsInMemory {
    static fetchFirst() {
        var d = Q.defer();

        var poll = _.first(polls);
        if (poll) {
            d.resolve(poll);
        } else {
            d.reject(new Error("No polls"));
        }

        return d.promise;
    }

    static fetchById(id) {
        var d = Q.defer();

        var poll = _.findWhere(polls, { id: id });
        if (poll) {
            d.resolve(poll);
        } else {
            d.reject(new Error("Could not find Poll"));
        }

        return d.promise;
    }
}
