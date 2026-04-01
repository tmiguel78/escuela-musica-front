import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Teachers = () => {
    const [data, setData] = useState(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL + '/teacher';
    const isAdmin = !!localStorage.getItem('authToken');

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error obteniendo los datos.')
            }
            const resData = await response.json();
            setData(resData)          
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchData()
    },[]);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar este profesor?')) return;
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teacher/${id}`,{
                method: 'DELETE',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            if (!response.ok) {
                throw new Error('Error al borrar')
            }
            await fetchData()
        } catch (error) {
            console.log(error)
        }
    };

    return(
    <>
        <h1>Profesorado</h1>
        {isAdmin && <Link to="/new-teacher"><button className="add-button">+</button></Link>}
        <div className="general-container">
            {data === null 
            ? <div className="loading basic-card">
                <h2>Cargando...</h2>
                <p>Puede tardar 15-20 segundos hasta que "despierte" el servidor</p>
              </div>
            : data.map(teacher => (
                <div className="basic-card" key={teacher._id}>
                    <h3>Nombre:</h3><p>{teacher.name}</p>
                    <h3>Instrumento:</h3><p>{teacher.instrument}</p>
                    <img src={teacher.image} alt={teacher.name} />
                    <h3>Curriculum:</h3>
                    <p>{teacher.curriculum}</p>
                    {isAdmin && (
                    <>  <button>Editar</button>
                        <button onClick={()=> handleDelete(teacher._id)}>Eliminar</button>
                    </>
                    )
                    }
               </div>
            )) 
            }
        </div>
    </>
    )
}

export default Teachers;