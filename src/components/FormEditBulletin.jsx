import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditBulletin = () => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const { bulletinId } = useParams()

    const navigate = useNavigate();

    const urlBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000' 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch(urlBase + '/bulletin')
               if (!response.ok) {
                    throw new Error('Error obteniendo el anuncio');
                }
               const data = await response.json()
               const editedBulletin = data.find(item => item._id === bulletinId) 

               if(!editedBulletin) {
                throw new Error('Anuncio no encontrado')
               }
               setText(editedBulletin.text)
               setCurrentImage(editedBulletin.image || "");

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [bulletinId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const urlApi = urlBase + `/bulletin/${bulletinId}`

        const formData = new FormData();
        formData.append('text', text);
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
                throw new Error("Error editando anuncio");
            }

            alert("Anuncio editado correctamente");
            navigate('/bulletin');

        } catch (error) {
            console.log(error)
        }
    };
    

    return (
        <div className="login-container">
            <h1>Formulario Editar Anuncio</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    cols='30'
                    rows='5'
                    placeholder={text}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                {currentImage && !image && <img src={currentImage} alt="Imagen actual del anuncio" />}

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

export default FormEditBulletin;