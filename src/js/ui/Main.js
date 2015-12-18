import React from "react";
import ActivePoll from "./ActivePoll";

export default class Main extends React.Component {
    render() {
        return (
            <div className="app">
                <ActivePoll />
            </div>
        );
    }
}
