import React, { useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {

  const [drawings, setDrawings] = useState([]) // 캔버스에 생성된 다각형 배열 state

  // render
  return (
    <div className="app">
      <Canvas drawings={drawings} setDrawings={setDrawings} />
      <List drawings={drawings} />
    </div>
  );
}

// Canvas 컴포넌트 
function Canvas(props) {

  const { drawings, setDrawings } = props

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [deleteMode, setDeleteMode] = useState(false) // 삭제하기 모드 state
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState()
  const [startPoints, setStartPoints] = useState((0, 0))

  useEffect(() => {
    // 캔버스 기본 설정 
    const canvas = canvasRef.current // 캔버스 DOM을 선택
    canvas.width = window.innerWidth * 0.5 // 캔버스 너비
    canvas.height = window.innerHeight // 캔버스 높이

    const context = canvas.getContext("2d")
    context.strokeStyle = "black"
    context.lineWidth = 2.5
    contextRef.current = context

    setCtx(contextRef.current)

  }, [])

  const startDrawing = () => {
    setIsDrawing(true) 
  }

  const finishDrawing = () => {
    setIsDrawing(false)
    ctx.closePath() // 마우스를 떼면 시작점과 끝점을 이어줌
    ctx.stroke()
  }

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath()
        ctx.moveTo(offsetX, offsetY)
      } else {
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()
      }
    }
  }

  return (
    <div className="container">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}      
        ></canvas>
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
