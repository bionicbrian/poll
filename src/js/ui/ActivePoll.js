import React from "react";
import ReactDOM from "react-dom";

import { Poll } from "../models/Poll";
import App from "../App";
import addCandidate from "../actions/addCandidate";

import Candidate from "./Candidate";

export default class ActivePoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: new Poll() // Should use a NullPoll
        };
        this._pollsRepo = App.get("pollsRepo");
    }

    componentDidMount() {
        this._pollsRepo.fetchFirst()
            .done((poll) => {
                poll.on("update", (poll) => {
                    this.setState({ poll });
                });
                this.setState({ poll });
            });
    }

    render() {
        return (
            <div>
                <h1>Poll: {this._title}</h1>
                <form onSubmit={(ev) => this._addCandidate(ev)}>
                    <input type="text" ref="candidateName" />
                    <button type="submit">Add</button>
                </form>
                <ul className="candidate-list">
                {this._candidates.map((c) => {
                    return <Candidate key={c.cid} candidate={c} />;
                })}
                </ul>
            </div>
        )
    }

    get _title() {
        return !this.state.poll ? null : this.state.poll.get("title");
    }

    get _candidates() {
        if (!this.state.poll) {
            return [];
        } else {
            return this.state.poll.get("candidates");
        }
    }

    _showError(e) {
        debugger;
    }

    _addCandidate(ev) {
        ev.preventDefault();
        var input = ReactDOM.findDOMNode(this.refs.candidateName);

        addCandidate(this.state.poll, { name: input.value, pollId: this.state.poll.id })
            .catch((e) => this._showError(e))
            .done(() => input.value = "");
    }
}
