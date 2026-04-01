import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewFormTeacher = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [curriculum, setCurriculum] = useState('');
    const [instrument, setInstrument] = useState('');
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("La imagen es obligatoria");
            return;
        }
        const token = localStorage.getItem('authToken');

        const urlBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000' 
        const urlApi = urlBase+'/teacher';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('instrument', instrument);
        formData.append('curriculum', curriculum);

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
                throw new Error("Error creando profesor");
            }

            setName('');
            setImage(null);
            setCurriculum('');
            setInstrument('');
            alert("Profesor creado correctamente");
            navigate('/teachers');
            
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className="login-container">
            <h1>Formulario Nuevo Profesor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre y apellidos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Instrumento"
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
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
                <textarea
                    rows='3'
                    cols='60'
                    placeholder="Curriculum Vitae"
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    required
                />
                <button type="submit">Crear</button>
            </form>
        </div>

    )
};

export default NewFormTeacher;