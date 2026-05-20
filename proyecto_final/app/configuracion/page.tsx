import Menu from "../components/menu/menu"
import AccountPage from '../components/pagina-configuracion/AccountPage';

export default function Configuracion()
{
    return (
        <div style={{ display: "flex" }}>
            <Menu />
            <AccountPage  />
        </div>
    );
}