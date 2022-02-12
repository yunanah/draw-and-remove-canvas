import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus, faCirclePlus, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
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
  const [isDrawing, setIsDrawing] = useState(false) // 그리기 모드 state
  const [path, setPath] = useState(null) // 새로운 마우스 움직인 경로 state
  const [idx, setIdx] = useState(1) // path 생성 인덱스 state
  const [scaleRate, setScaleRate] = useState(1.0) // 화면 배율 state
  const [ctx, setCtx] = useState()

  //화면 배율 조절을 위한 변수 설정 
  const scaleMultiplier = 0.8

  useEffect(() => {
    // 캔버스 기본 설정 
    const canvas = canvasRef.current // 캔버스 DOM을 선택
    canvas.width = 800 // 캔버스 너비
    // canvas.height = window.innerHeight * 0.95 
    canvas.height = 600 // 캔버스 높이

    // console.log(canvas.width, canvas.height)

    const context = canvas.getContext("2d")
    context.strokeStyle = "black"
    context.lineWidth = 2.5
    contextRef.current = context

    setCtx(contextRef.current)

  }, [paths])

  useEffect(() => {
    console.log('lets repaint paths', paths)

    // 중앙을 기준으로 캔버스에 배율 적용
    contextRef.current.setTransform(scaleRate, 0, 0, scaleRate, -(scaleRate-1)*(window.innerWidth/2), -(scaleRate-1)*(window.innerHeight/2))

    // 캔버스에 그려진 이전 ctx 상태를 지우고 paths 배열에 저장된 것들을 다시 그려줌 
    contextRef.current.clearRect(0, 0, 800, 600)
    if (paths) {
      Object.values(paths).forEach((a, i) => {
        console.log(a)
        contextRef.current.stroke(a)
      })
    }

  }, [paths, scaleRate])

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

    // 새로운 path를 paths에 추가
    let newPaths = {
      ...paths,
      ['Polygon'+ idx] : path
    }

    setIdx(idx+1)
    setPaths(newPaths)
  }

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath()
        ctx.moveTo(offsetX, offsetY)
      } else {
        path.lineTo(offsetX, offsetY)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()
      }
    }
  }

  const deletePolygon = (e) => {
    let x = e.pageX
    let y = e.pageY
    if (deleteMode) {
      console.log('hi')
      Object.entries(paths).forEach((a, i) => {
        if (ctx.isPointInPath(a[1], x, y)) {
          let clonePaths = {...paths} // paths 복제한 객체
          delete clonePaths[a[0]]
          setPaths(clonePaths) // 해당하는 path의 다각형을 삭제한 객체를 paths로 변경

          // test
          console.log(a[0], paths[a[0]])
          console.log('deleted', paths)
        }
      })
    }
  }

  // 화면 배율 크게
  const plusScale = () => {
    setScaleRate(scaleRate/scaleMultiplier)
  }

  // 화면 배율 작게
  const minusScale = () => {
    setScaleRate(scaleRate*scaleMultiplier)
  }

  return (
    <div className="container">
        <span onClick={() => {
          setDeleteMode(!deleteMode)
        }}>삭제모드<FontAwesomeIcon className="delete-check" icon={ deleteMode ? faSquareCheck : faSquare } /></span>
        <canvas
          ref={canvasRef}
          onMouseDown={deleteMode ? deletePolygon : startDrawing}
          onMouseUp={deleteMode ? null : finishDrawing}
          onMouseMove={deleteMode ? null : drawing}    
        ></canvas>
        <div className="rate-control">
          <p>{scaleRate.toFixed(2) * 100}%</p>
          <FontAwesomeIcon className="zoom-in" icon={faCirclePlus} onClick={plusScale} />
          <FontAwesomeIcon className="zoom-out" icon={faCircleMinus} onClick={minusScale} />
        </div>
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
