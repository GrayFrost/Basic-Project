import React from "react";
import "./styles/App.less";
import img from "./images/a.jpg";

function App() {
  const onClick = () => {
    import('./buttonClickFunc').then(module => {
      const {sayHello, sayGoodbye} = module;
      sayHello();
      sayGoodbye();
    })
  }
    return (
        <div id="app">
            <h1>Hello Webpack22</h1>
            <button onClick={onClick}>click me to load file</button>
            <img src={img} alt="" />
        </div>
    );
}

export default App;
