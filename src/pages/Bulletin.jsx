import { useState, useEffect } from "react";

const Bulletin = () => {
    const [data, setData] = useState(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL + '/bulletin';
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
    },[])

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar este anuncio?')) return;
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bulletin/${id}`,{
                method: 'DELETE',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            if (!response.ok) {
                console.log('Status:', response.status);
            const errorText = await response.text();
            console.log('Respuesta backend:', errorText);
            throw new Error('Error al borrar');
            }
            
            await fetchData()
        } catch (error) {
            console.log(error)
        }
    };


    return(
    <>
        <h1>Tablón de anuncios</h1>
        {isAdmin && <button className="add-button">+</button>}
        <div className="bulletin-container">
        {data === null 
        ?
        <div className="loading basic-card">
            <h2 style={{ textAlign: "center" }}>Cargando...</h2>
            <p style={{ textAlign: "center" }}>Puede tardar 15-20 segundos hasta que "despierte" el servidor</p>
        </div>
        :
        <ul >
            {data.map(bulletin => (
                <li key={bulletin._id}>
                    <p>{bulletin.text}</p>
                    {bulletin.image && <img src={bulletin.image} alt={bulletin.text} />}
                    {isAdmin && (
                    <>  <button>Editar</button>
                        <button onClick={()=> handleDelete(bulletin._id)}>Eliminar</button>
                    </>
                    )
                    }
                </li>
            ))}
        </ul>
        }
        </div>
    </>
    )
}

export default Bulletin;