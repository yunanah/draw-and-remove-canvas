import React, { useState } from "react";
import Canvas from "./components/Canvas";
import List from "./components/List";
import "./styles/App.scss";

function App() {
  //state
  const [paths, setPaths] = useState({}); // 캔버스에 생성된 다각형 path를 Path2D 객체로 저장한 배열 state

  // render
  return (
    <div className="app">
      <Canvas paths={paths} setPaths={setPaths} />
      <List paths={paths} />
    </div>
  );
}

export default App;
