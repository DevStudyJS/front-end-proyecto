import Image from "next/image";
import Login from "./(auth)/login/login"
import Mapa from "./Mapa/mapa";
 import { Tienda } from "./Tienda/tienda";

export default function Home() {
  return (
    <Mapa />
  )
  };

export default function TiendaPage() {
  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
        Tienda de Personalización
      </h1>
      <Tienda />
    </main>
  );
}