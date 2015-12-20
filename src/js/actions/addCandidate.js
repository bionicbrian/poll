import Q from "q";

export default function addCandidate(poll, { name, pollId }) {
    var d = Q.defer();

    poll.get("candidates").add({ name });
    d.resolve(poll);

    return d.promise;
}
