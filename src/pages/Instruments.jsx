import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Instruments = () => {
    const [data, setData] = useState(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL + '/instrument';
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
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar este instrumento?')) return;
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/instrument/${id}`,{
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
        <h1>Instrumentos</h1>
        {isAdmin && <Link to="/new-instrument"><button className="add-button">+</button></Link>}
        <div className="general-container">
            {data === null 
            ? <div className="loading basic-card">
                <h2>Cargando...</h2>
                <p>Puede tardar 15-20 segundos hasta que "despierte" el servidor</p>
                </div>
            : data.map(inst => (
                <div className="basic-card" key={inst._id}>
                    <h3>{inst.name}</h3>
                    <img src={inst.image} alt={inst.name} />
                    {isAdmin && (
                    <>  <Link to={`/instrument/${inst._id}`}><button>Editar</button></Link>
                        <button onClick={()=> handleDelete(inst._id)}>Eliminar</button>
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

export default Instruments;