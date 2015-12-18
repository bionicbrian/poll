import Q from "q";
import { Poll } from "../models/Poll";

export class PollsInMemory {
    static fetchFirst() {
        var d = Q.defer();
        var poll = new Poll({ title: "Lunch" });
        setTimeout(() => {
            d.resolve(poll);
        }, 1000);
        return d.promise;
    }
}
