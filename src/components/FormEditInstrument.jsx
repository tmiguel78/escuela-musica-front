import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditInstrument = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const { instrumentId } = useParams()

    const navigate = useNavigate();

    const urlBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000' 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch(urlBase + '/instrument')
               if (!response.ok) {
                    throw new Error('Error obteniendo el instrumento');
                }
               const data = await response.json()
               const editedInstrument = data.find(item => item._id === instrumentId) 

               if(!editedInstrument) {
                throw new Error('Instrumento no encontrado')
               }
               setName(editedInstrument.name)
               setCurrentImage(editedInstrument.image || "");

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [instrumentId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const urlApi = urlBase + `/instrument/${instrumentId}`

        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }
        try {
            const response = await fetch(urlApi, {
                method : 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (response.status === 401) {
                alert('Tu sesión ha caducado. Vuelve a iniciar sesión.');
                localStorage.removeItem('authToken');
                navigate('/login');
                return;
            };

            if (!response.ok) {
                throw new Error("Error editando instrumento");
            }

            alert("Instrumento editado correctamente");
            navigate('/instruments');

        } catch (error) {
            console.log(error)
        }
    };
    

    return (
        <div className="login-container">
            <h1>Formulario Editar Instrumento</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {currentImage && !image && <img src={currentImage} alt="Imagen actual del instrumento" />}

                <input 
                    type="file"
                    id="image" 
                    name="image" 
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    )
};

export default FormEditInstrument;