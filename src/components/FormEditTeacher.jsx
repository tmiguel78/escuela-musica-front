import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditTeacher = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [curriculum, setCurriculum] = useState('');
    const [instrument, setInstrument] = useState('');
    const [currentImage, setCurrentImage] = useState("");
    const { teacherId } = useParams()

    const navigate = useNavigate();

    const urlBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000' 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch(urlBase + '/teacher')
               if (!response.ok) {
                    throw new Error('Error obteniendo el profesor');
                }
               const data = await response.json()
               const editedTeacher = data.find(item => item._id === teacherId) 

               if(!editedTeacher) {
                throw new Error('Profesor no encontrado')
               }
               setName(editedTeacher.name);
               setCurrentImage(editedTeacher.image || "");
               setCurriculum(editedTeacher.curriculum);
               setInstrument(editedTeacher.instrument);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [teacherId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const urlApi = urlBase + `/teacher/${teacherId}`

        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }
        formData.append('instrument', instrument);
        formData.append('curriculum', curriculum);

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
                throw new Error("Error editando el profesor");
            }

            alert("Profesor editado correctamente");
            navigate('/teachers');

        } catch (error) {
            console.log(error)
        }
    };
    

    return (
        <div className="login-container">
            <h1>Formulario Editar Profesor</h1>
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
                {currentImage && !image && <img src={currentImage} alt="Imagen actual del profesor" />}
                
                <textarea
                    rows='3'
                    cols='60'
                    placeholder="Curriculum Vitae"
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    required
                />              
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    )
};

export default FormEditTeacher;