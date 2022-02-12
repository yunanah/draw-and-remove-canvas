import React, { useState } from 'react';
import './App.css';

function App() {

  let [drawings, setDrawings] = useState([]) // 캔버스에 생성된 다각형 배열 state

  // render
  return (
    <div className="App">
      <Canvas drawings={drawings} setDrawings={setDrawings} />
      <List drawings={drawings} />
    </div>
  );
}

// Canvas 컴포넌트 
function Canvas(props) {

  const { drawings, setDrawings } = props

  let [deleteMode, setDeleteMode] = useState(false) // 삭제하기 모드 state
  

  return (
    <div className="container">
        캔버스
    </div>
  );
}

// List 컴포넌트
function List(props) {

  const { drawings } = props

  return (
    <div className="box">
      리스트
    </div>
  );
}

export default App;
