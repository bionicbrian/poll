import React from "react";

class Hello extends React.component {
    render() {
        return <h1>Hello</h1>
    }
}

React.render(<Hello />, document.querySelector(".main"));
