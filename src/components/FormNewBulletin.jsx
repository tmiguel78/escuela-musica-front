import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormNewBulletin = () => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        const urlBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000' 
        const urlApi = urlBase+'/bulletin';
        
        const formData = new FormData();
        formData.append('text', text);
        if (image) {
            formData.append('image', image)
        }

        try {
            const response = await fetch(urlApi, {
                method: 'POST', 
                headers: {
                 Authorization : `Bearer ${token}`
                },
                body: formData
            })
            if (response.status === 401) {
                alert('Tu sesión ha caducado. Vuelve a iniciar sesión.');
                localStorage.removeItem('authToken');
                navigate('/login');
                return;
            }
            if (!response.ok) {
                throw new Error("Error creando anuncio");
            }

            setText('');
            setImage(null);
            alert("Anuncio creado correctamente");
            navigate('/bulletin');
            
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="login-container">
            <h1>Formulario Nuevo Anuncio</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    cols='30'
                    rows='5'
                    placeholder="Texto del anuncio"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <input 
                    type="file"
                    id="image" 
                    name="image" 
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Crear</button>
            </form>
        </div>
    )
};

export default FormNewBulletin;