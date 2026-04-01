import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewFormInstrument = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("La imagen es obligatoria");
            return;
        }
        const token = localStorage.getItem('authToken');

        const urlBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000' 
        const urlApi = urlBase+'/instrument';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

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
                throw new Error("Error creando instrumento");
            }

            setName('');
            setImage(null);
            alert("Instrumento creado correctamente");
            navigate('/instruments');
            
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className="login-container">
            <h1>Formulario Nuevo Instrumento</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del instrumento"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="file"
                    id="image" 
                    name="image" 
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="image">* Imagen obligatoria</label>
                <button type="submit">Crear</button>
            </form>
        </div>

    )
};

export default NewFormInstrument;