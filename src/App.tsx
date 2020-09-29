import * as React from "react";
import "./styles/App.less";
import img from "./images/a.jpg";
import { Button } from "antd";
import "antd/dist/antd.css";

function App() {
    const onClick = () => {
        import("./buttonClickFunc").then((module) => {
            const { sayHello, sayGoodbye } = module;
            sayHello();
            sayGoodbye();
        });
    };
    return (
        <div id="app">
            <h1>Hello Webpack22</h1>
            <Button onClick={onClick}>click me to load file</Button>
            {/* <img src={img} alt="" /> */}
        </div>
    );
}

export default App;
