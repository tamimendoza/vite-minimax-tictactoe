import { PUNTAJE, TURNO } from "./Constante";
import Verificador from "./Verificador";

export default function Minimax(tablero, profundidad, esMax) {
  let resultado = Verificador(tablero)
  if (resultado !== null) {
    return resultado == TURNO.ROBOT ? PUNTAJE.X : resultado == TURNO.HUMANO ? PUNTAJE.O : PUNTAJE.EMPATE
  }

  let mejorResultado = esMax ? -Infinity : Infinity
  let jugador = esMax ? TURNO.ROBOT : TURNO.HUMANO

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++){
      if (tablero[i][j] === '') {
        tablero[i][j] = jugador
        let resultadoMinMax = Minimax(tablero, profundidad + 1, !esMax)
        tablero[i][j] = ''
        mejorResultado = esMax ? Math.max(mejorResultado, resultadoMinMax) : Math.min(mejorResultado, resultadoMinMax)
      }
    }
  }
  return mejorResultado
}
