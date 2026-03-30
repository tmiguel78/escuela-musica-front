import { useState, useEffect } from "react";

const Bulletin = () => {
    const [data, setData] = useState(null);
    const apiUrl = 'https://escuela-musica-back.onrender.com/api/bulletin'
    
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


    return(
    <>
        <h1>Tablón de anuncios</h1>
        {data === null 
        ?
        <div>
            <h2 style={{ textAlign: "center" }}>Cargando...</h2>
            <p style={{ textAlign: "center" }}>Puede tardar 15-20 segundos hasta que "despierte" el servidor</p>
        </div>
        :
        <ul className="bulletin-container">
            {data.map(bulletin => (
                <li key={bulletin._id}>
                    <p>{bulletin.text}</p>
                    {bulletin.image && <img src={bulletin.image} alt={bulletin.name} />}
                </li>
            ))}
        </ul>
        }
    </>
    )
}

export default Bulletin;