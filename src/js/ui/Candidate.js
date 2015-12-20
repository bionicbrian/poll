import React from "react";
import App from "../App";
import addVote from "../actions/addVote";

export default class Candidate extends React.Component {
    render() {
        return (
            <li className="candidate-item">
                {this._name} | {this._votesValue}
                <button disabled={this._hasUserVoted}
                        onClick={(ev) => this._addVote(ev)}>Vote</button>
            </li>
        );
    }

    get _name() {
        return this.props.candidate.get("name");
    }

    get _votes() {
        return this.props.candidate.get("votes");
    }

    get _votesValue() {
        return this._votes.reduce((vs, v) => vs + v.get("value"), 0);
    }

    get _hasUserVoted() {
        return !!this._votes.findWhere({ userId: App.get("user").id });
    }

    _showError(e) {
        alert(e.message);
    }

    _addVote() {
        addVote(this.props.candidate, { value: 1 })
            .catch((e) => this._showError(e))
            .done(  );
    }
}
