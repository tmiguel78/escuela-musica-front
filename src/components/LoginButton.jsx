import { Link, useNavigate } from "react-router-dom";

const LoginButton = () => {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    return token 
    ? (<button className="login-button"
        onClick={() => {
            localStorage.removeItem('authToken');
            navigate('/');
        }}>Logout</button>)
    : (
        <Link to='/login'>
        <button className="login-button">Login</button>
        </Link>
    )
}


export default LoginButton;
