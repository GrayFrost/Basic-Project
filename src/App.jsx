import React from "react";
import "./styles/App.less";
import img from "./images/a.jpg";

function App() {
    return (
        <div id="app">
            <h1>Hello Webpack</h1>
            <img src={img} alt="" />
        </div>
    );
}

export default App;
