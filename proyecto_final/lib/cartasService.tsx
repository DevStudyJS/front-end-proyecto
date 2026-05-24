import { Card } from './types';

const memoramaCards: Card[] = [
  { id: 1, pregunta: '2 + 2', respuesta: '4', match: false },
  { id: 2, pregunta: '3 x 3', respuesta: '9', match: false },
  { id: 3, pregunta: '5 - 1', respuesta: '4', match: false },
  { id: 4, pregunta: '6 ÷ 2', respuesta: '3', match: false },
  { id: 5, pregunta: '7 - 3', respuesta: '4', match: false },
  { id: 6, pregunta: '8 ÷ 2', respuesta: '4', match: false },
];

export async function muestraMemorama(lessonId: number): Promise<Card[]> {
  return memoramaCards.map((card) => ({ ...card, match: false }));
}

export function pares(id1: number, id2: number) {
  console.log('Pares marcados:', id1, id2);
}

export function deleteCarta(id: number) {
  console.log('Carta eliminada:', id);
}

export function agregaMemorama(carta: Card) {
  console.log('Carta agregada:', carta);
}
