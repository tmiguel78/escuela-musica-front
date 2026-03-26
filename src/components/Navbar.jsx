import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav>
                <Link to='/'>Inicio</Link>
                <Link to='/instruments'>Instrumentos</Link>
                <Link to='/teachers'>Profesorado</Link>
                <Link to='/bulletin'>Tablón de anuncios</Link>
                <Link to='/contact'>Contacto</Link>
            </nav>
        </>
    )
};

export default Navbar;