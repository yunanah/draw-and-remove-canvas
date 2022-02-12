import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.scss';

function App() {

  const [paths, setPaths] = useState({}) // 캔버스에 생성된 다각형 path를 Path2D 객체로 저장한 배열 state

  // render
  return (
    <div className="app">
      <Canvas paths={paths} setPaths={setPaths} />
      <List paths={paths} />
    </div>
  );
}

// List 컴포넌트
function List(props) {

  const { paths } = props

  console.log(Object.keys(paths))

  return (
    <div className="box">
      {
        Object.keys(paths).map((a, i) => {
          return (
            <span key={i}>{a}</span>
          )
        })
      }
    </div>
  );
}

export default App;
