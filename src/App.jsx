import { useEffect, useState } from "react"
import { TURNO } from "./Constante"
import Verificador from "./Verificador"
import Minimax from "./Minimax"

let tablero = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function App() {
  const [turno, setTurno] = useState(TURNO.ROBOT)
  const [gano, setGano] = useState('')

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    let ancho = canvas.width
    let alto = canvas.height
    let anchoCelda = ancho / 3
    let altoCelda = alto / 3
    dibujarTablero(ctx, ancho, alto, anchoCelda, altoCelda)
    dibujarJuego(ctx, anchoCelda, altoCelda)
  }, [])

  useEffect(() => {
    if (turno === TURNO.ROBOT) {
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      let ancho = canvas.width
      let alto = canvas.height
      let anchoCelda = ancho / 3
      let altoCelda = alto / 3
      evtTurnoRobot(ctx, anchoCelda, altoCelda)
      verificarGanador(TURNO.HUMANO)
    }
  }, [turno])

  const dibujarLinea = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  const dibujarTablero = (ctx, ancho, alto, anchoCelda, altoCelda) => {
    ctx.lineWidth = 2
    ctx.clearRect(0, 0, ancho, alto)
    ctx.strokeStyle = 'white'
    dibujarLinea(ctx, 0, altoCelda, ancho, altoCelda)
    dibujarLinea(ctx, 0, altoCelda * 2, ancho, altoCelda * 2)
    dibujarLinea(ctx, anchoCelda, 0, anchoCelda, alto)
    dibujarLinea(ctx, anchoCelda * 2, 0, anchoCelda * 2, alto)
  }

  const dibujarX = (ctx, x1, y1, x2, y2, x3, y3, x4, y4) => {
    dibujarLinea(ctx, x1, y1, x2, y2)
    dibujarLinea(ctx, x3, y3, x4, y4)
  }

  const dibujarO = (ctx, x, y, radio) => {
    ctx.beginPath()
    ctx.arc(x, y, radio, 0, Math.PI * 2)
    ctx.stroke()
  }

  const dibujarJuego = (ctx, anchoCelda, altoCelda) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = anchoCelda * i + anchoCelda / 2
        let y = altoCelda * j + altoCelda / 2
        let radio = anchoCelda / 3
        if (tablero[i][j] === TURNO.ROBOT) {
          dibujarX(ctx, x - radio, y - radio, x + radio, y + radio, x + radio, y - radio, x - radio, y + radio)
        } else if (tablero[i][j] === TURNO.HUMANO) {
          dibujarO(ctx, x, y, radio)
        }
      }
    }
  }

  const evtTurnoRobot = (ctx, anchoCelda, altoCelda) => {
    if (turno === TURNO.ROBOT) {
      let mejorPuntaje = -Infinity
      let movimiento = null
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (tablero[i][j] === TURNO.NADIE) {
            tablero[i][j] = TURNO.ROBOT
            let puntaje = Minimax(tablero, 0, false)
            tablero[i][j] = TURNO.NADIE
            if (puntaje > mejorPuntaje) {
              mejorPuntaje = puntaje
              movimiento = { i, j }
            }
          }
        }
      }

      if (movimiento != null) {
        tablero[movimiento.i][movimiento.j] = TURNO.ROBOT
        dibujarJuego(ctx, anchoCelda, altoCelda)
      }
    }
  }

  const evtDibujarEnTablero = (evt) => {
    if (turno === TURNO.HUMANO) {
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      let ancho = canvas.width
      let alto = canvas.height
      let anchoCelda = ancho / 3
      let altoCelda = alto / 3

      const mouseX = evt.clientX - canvas.getBoundingClientRect().left
      const mouseY = evt.clientY - canvas.getBoundingClientRect().top

      let i = Math.floor(mouseX / anchoCelda)
      let j = Math.floor(mouseY / altoCelda)

      if (tablero[i][j] === TURNO.NADIE) {
        tablero[i][j] = TURNO.HUMANO
        dibujarJuego(ctx, anchoCelda, altoCelda)
        verificarGanador(TURNO.ROBOT)
      }
    }
  }

  const verificarGanador = (siguiente) => {
    let ganador = Verificador(tablero)
    if (ganador != null) {
      if (ganador === TURNO.ROBOT) {
        setGano('Ganó el robot')
      } else if (ganador === TURNO.HUMANO) {
        setGano('Ganó el humano')
      } else {
        setGano('Empate')
      }
      setTurno(TURNO.NADIE)
    } else {
      if (siguiente === TURNO.ROBOT) {
        setTurno(TURNO.ROBOT)
      } else {
        setTurno(TURNO.HUMANO)
      }
    }
  }

  const evtReiniciarJuego = () => {
    tablero = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    let ancho = canvas.width
    let alto = canvas.height
    let anchoCelda = ancho / 3
    let altoCelda = alto / 3
    dibujarTablero(ctx, ancho, alto, anchoCelda, altoCelda)
    dibujarJuego(ctx, anchoCelda, altoCelda)
    setTurno(TURNO.ROBOT)
    setGano('')
  }

  return (
    <>
      <canvas
        style={{ background: 'teal' }}
        width='250'
        height='250'
        onClick={evtDibujarEnTablero}
      />
      <br />
      <span style={{ fontSize: 20 }}>{gano}</span>
      <br />
      <button onClick={evtReiniciarJuego} >Reiniciar</button>
    </>
  )
}

export default App
