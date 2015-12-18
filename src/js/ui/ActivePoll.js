import React from "react";
import ReactDOM from "react-dom";
import { Poll } from "../models/Poll";
import { Candidate } from "../models/Candidate";
import { Vote } from "../models/Vote";
import { PollsInMemory as PollsRepo } from "../repos/PollsInMemory";

export default class ActivePoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: new Poll()
        };
    }

    componentDidMount() {
        PollsRepo.fetchFirst()
            .then((poll) => {
                poll.on("update", (poll) => {
                    this.setState({ poll });
                });
                this.setState({ poll });
            });
    }

    render() {
        return (
            <div>
                <h1>Poll: {this.state.poll.get("title")}</h1>
                <form onSubmit={(ev) => this._addCandidate(ev)}>
                    <input type="text" ref="candidateName" />
                    <button type="submit">Add</button>
                </form>
                <ul>
                {this.state.poll.get("candidates").map((c) => {
                    return <li key={c.cid}>{c.get("name")} : {c.get("votes").first().get("value")}</li>;
                })}
                </ul>
            </div>
        )
    }

    _addCandidate(ev) {
        ev.preventDefault();
        var input = ReactDOM.findDOMNode(this.refs.candidateName);
        var c = new Candidate({ name: input.value });
        c.get("votes").add(new Vote({ value: 1 }));
        this.state.poll.get("candidates").add(c);
        input.value = "";

        setTimeout(() => c.get("votes").first().set("value", 2), 2000);
    }
}
