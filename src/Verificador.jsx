import { PUNTAJE } from "./Constante"

export default function Verificador(tablero) {
  let ganador = null 

  // Verificar filas
  for (let i = 0; i < 3; i++) {
    if (tablero[i][0] !== '' && tablero[i][0] === tablero[i][1] && tablero[i][0] === tablero[i][2]) {
      ganador = tablero[i][0]
    }
  }

  // Verificar columnas
  for (let j = 0; j < 3; j++) {
    if (tablero[0][j] !== '' && tablero[0][j] === tablero[1][j] && tablero[0][j] === tablero[2][j]) {
      ganador = tablero[0][j]
    }
  }

  // Verificar diagonales
  if (tablero[0][0] !== '' && tablero[0][0] === tablero[1][1] && tablero[0][0] === tablero[2][2]) {
    ganador = tablero[0][0]
  }

  if (tablero[0][2] !== '' && tablero[0][2] === tablero[1][1] && tablero[0][2] === tablero[2][0]) {
    ganador = tablero[0][2]
  }

  // Verificar empate
  let contador = 0 
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++){
      if (tablero[i][j] == '') {
        contador++
      }
    }
  }

  if (ganador == null && contador === 0) {
    return PUNTAJE.EMPATE
  } else {
    return ganador
  }
}
