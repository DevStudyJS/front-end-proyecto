"use client";

import { useEffect, useState } from "react";
import { agregaMemorama, muestraMemorama, pares, deleteCarta } from "@/lib/cartasService";
import { Card } from "@/lib/types";

export default function Memorama() {
  const [cartas, setCartas] = useState<Card[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await muestraMemorama(1);
      setCartas(data.sort(() => Math.random() - 0.5));
    };
    fetchData();
  }, []);

  const handleFlip = (carta: Card) => {
    if (seleccionadas.length === 2 || carta.match) return;

    setSeleccionadas([...seleccionadas, carta]);

    if (seleccionadas.length === 1) {
      const [primera] = seleccionadas;
      const segunda = carta;

      if (primera.respuesta === segunda.respuesta) {
        pares(primera.id, segunda.id);
        setCartas((prev) =>
          prev.map((c) =>
            [primera.id, segunda.id].includes(c.id) ? { ...c, match: true } : c
          )
        );
      } else {
        setTimeout(() => {
          setCartas((prev) =>
            prev.map((c) =>
              [primera.id, segunda.id].includes(c.id)
                ? { ...c, match: false }
                : c
            )
          );
        }, 1000);
      }
      setSeleccionadas([]);
    }
  };

  return (
    <div className="memorama">
      {cartas.map((carta) => (
        <div
          key={carta.id}
          className={`carta ${carta.match ? "visible" : ""}`}
          onClick={() => handleFlip(carta)}
        >
          {carta.match ? (
            <div>
              <p>{carta.pregunta}</p>
              <p>{carta.respuesta}</p>
            </div>
          ) : (
            <span> ??? </span>
          )}
        </div>
      ))}
    </div>
  );
}
