import { useEffect, useState } from "react";

const Instruments = () => {
    const [data, setData] = useState(null);
    const apiUrl = 'https://escuela-musica-back.onrender.com/api/instrument'

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
    }, [])

    return(
    <>
        <h1>Instrumentos</h1>
        <div className="general-container">
            {data === null 
            ? <div>
                <h2 style={{ textAlign: "center" }}>Cargando...</h2>
                <p>Puede tardar 15-20 segundos hasta que "despierte" el servidor</p>
                </div>
            : data.map(inst => (
                <div className="basic-card" key={inst._id}>
                    <h3>{inst.name}</h3>
                    <img src={inst.image} alt={inst.name} />
                </div>
            )) 
            }
        </div>
    </>
    )
}

export default Instruments;