import App from "../App";

export default function fetchPollById(pollId) {
    var pollsRepo = App.get("pollsRepo");
    return pollsRepo.fetchById(pollId);
}
