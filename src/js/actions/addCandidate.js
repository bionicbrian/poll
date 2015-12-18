import { Candidate } from "../models/Candidate";
import { PollsInMemory as PollsRepo } from "../repos/PollsInMemory";

export default function addCandidate({ name, pollId }) {
    return PollsRepo.fetchById(pollId).then((poll) => {
        var c = new Candidate({ name });
        poll.get("candidates").add(c);
        return poll;
    });
}
