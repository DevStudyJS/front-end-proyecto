"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import styles from "./mapa.module.css";
import HeaderFondo from "../HeaderFondo/headerFondo";

const visualesIsla: Record<number, { img: string; bloqueado: boolean }> = {
  1: { img: "/montaña.jpg", bloqueado: false },
  2: { img: "/islanormal.jpg", bloqueado: true },
  3: { img: "/islamorada.jpg", bloqueado: true },
  4: { img: "/islalila.jpg", bloqueado: true },
};

export default function Mapa() {
  const params = useParams()
  const [cursos, setCursos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("course_id", { ascending: true });
      if (error) setError(error.message);
      else setCursos(data || []);
    };
    fetchCursos();
  }, []);

  if (error) return <div>Error al cargar el mapa de aventuras.</div>;

  return (
    <div className={styles.mainWrapper}>
      <HeaderFondo />
      <main className={styles.mapGrid}>
        {cursos.map((curso) => {
          const visual =
            visualesIsla[curso.course_id] || {
              img: "/default.jpg",
              bloqueado: true,
            };

          const tarjetaContenido = (
            <div
              className={`${styles.islaCard} ${
                visual.bloqueado ? styles.locked : ""
              }`}
            >
              <img
                src={visual.img}
                alt={curso.title}
                className={styles.islaImagen}
              />
              {visual.bloqueado && <div className={styles.lockIcon}>🔒</div>}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {curso.title}
              </div>
            </div>
          );

          if (visual.bloqueado) {
            return <div key={curso.course_id}>{tarjetaContenido}</div>;
          }

          return (
            <Link
              key={curso.course_id}
              href={`/index/courses/${curso.course_id}`}
              style={{ textDecoration: "none" }}
            >
              {tarjetaContenido}
            </Link>
          );
        })}
      </main>
    </div>
  );
}