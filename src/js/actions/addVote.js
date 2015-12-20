import Q from "q";
import App from "../App";

export default function addVote(candidate, { value }) {
    var d = Q.defer();

    var userId = App.get("user").id;
    var votes = candidate.get("votes");
    var hasUserVoted = !!votes.findWhere({ userId });

    if (!hasUserVoted) {
        votes.add({ value, userId });
        d.resolve(candidate);
    } else {
        d.reject(new Error("User has already voted for this candidate."));
    }

    return d.promise;
}
