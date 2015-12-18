import React from "react";
import ReactDOM from "react-dom";
import { Poll } from "../models/Poll";
import { PollsInMemory as PollsRepo } from "../repos/PollsInMemory";
import addCandidate from "../actions/addCandidate";

export default class ActivePoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: new Poll() // Should use a NullPoll
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
                    return <li key={c.cid}>{c.get("name")}</li>;
                })}
                </ul>
            </div>
        )
    }

    _showError(e) {
        debugger;
    }

    _addCandidate(ev) {
        ev.preventDefault();
        var input = ReactDOM.findDOMNode(this.refs.candidateName);

        addCandidate({ name: input.value, pollId: this.state.poll.id }).done(() => {
            input.value = "";
        }, (e) => this._showError(e));
    }
}
