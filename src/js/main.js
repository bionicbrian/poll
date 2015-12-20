import React from "react";
import ReactDOM from "react-dom";

import PollsInMemory from "./repos/PollsInMemory";

import Main from "./ui/Main";
import App from "./App";

App.set("pollsRepo", new PollsInMemory());
App.set("user", { id: 123 });

ReactDOM.render(<Main />, document.querySelector(".main"));
