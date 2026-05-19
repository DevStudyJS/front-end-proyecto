import Image from "next/image";
import Login from "./(auth)/login/login"
import Mapa from "./Mapa/mapa";
import Menu from "./components/menu/menu";

export default function Home() {
  return (
    <div style={{display: "flex"}}>
      <Menu />

      <div style={{ flex: 1, padding: "20px"}}>
        <Mapa />
      </div>
    </div>
  );
}
