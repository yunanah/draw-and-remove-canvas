import React, { useEffect, useRef, useState } from 'react';
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

// Canvas 컴포넌트 
function Canvas(props) {

  const { paths, setPaths } = props

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [deleteMode, setDeleteMode] = useState(false) // 삭제하기 모드 state
  const [isDrawing, setIsDrawing] = useState(false)
  const [canvasInfo, setCanvasInfo] = useState([0, 0]) // 캔버스 너비, 높이 정보 - 계속 변함
  const [path, setPath] = useState(null) // 새로운 마우스 움직인 경로 state
  const [ctx, setCtx] = useState()

  useEffect(() => {
    // 캔버스 기본 설정 
    const canvas = canvasRef.current // 캔버스 DOM을 선택
    canvas.width = 500 // 캔버스 너비
    // canvas.height = window.innerHeight * 0.95 
    canvas.height = 500 // 캔버스 높이
    setCanvasInfo([canvas.width, canvas.height])

    // console.log(canvas.width, canvas.height)

    const context = canvas.getContext("2d")
    context.strokeStyle = "black"
    context.lineWidth = 2.5
    contextRef.current = context

    setCtx(contextRef.current)

  }, [])

  useEffect(() => {
    console.log('paths', paths)
    // console.log(canvasInfo)
    // 캔버스에 그려진 이전 ctx 상태를 지우고 paths 배열에 저장된 것들을 다시 그려줌 
    contextRef.current.clearRect(0, 0, 500, 500)
    Object.values(paths).forEach((a, i) => {
      // console.log(a)
      contextRef.current.stroke(a)
    })

  }, [paths])

  // 그리기 시작 함수
  const startDrawing = () => {
    setIsDrawing(true) 
    let p = new Path2D()
    setPath(p)
  }

  // 그리기 종료 함수
  const finishDrawing = () => {
    setIsDrawing(false)
    path.closePath()
    ctx.closePath() // 마우스를 떼면 시작점과 끝점을 이어줌
    ctx.stroke()

    let newPaths = {
      ...paths,
      ['Polygon'+ ++Object.keys(paths).length] : path
    }

    setPaths(newPaths)
  }

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath()
        ctx.moveTo(offsetX, offsetY)
        // path.moveTo(offsetX, offsetY)
      } else {
        path.lineTo(offsetX, offsetY)
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
          // onMouseLeave={finishDrawing}      
        ></canvas>
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
            <span>{a}</span>
          )
        })
      }
    </div>
  );
}

export default App;
