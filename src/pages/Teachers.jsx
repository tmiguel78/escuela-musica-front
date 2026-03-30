import { useEffect, useState } from "react";

const Teachers = () => {
    const [data, setData] = useState(null);
    const apiUrl = 'https://escuela-musica-back.onrender.com/api/teacher'

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
        <h1>Profesorado</h1>
        <div className="general-container">
            {data === null 
            ? <div>
                <h2 style={{ textAlign: "center" }}>Cargando...</h2>
                <p>Puede tardar 15-20 segundos hasta que "despierte" el servidor</p>
                </div>
            : data.map(teacher => (
                <div className="basic-card" key={teacher._id}>
                    <h3>Nombre:</h3><p>{teacher.name}</p>
                    <h3>Instrumento:</h3><p>{teacher.instrument}</p>
                    <img src={teacher.image} alt={teacher.name} />
                    <h3>Curriculum:</h3>
                    <p>{teacher.curriculum}</p>
               </div>
            )) 
            }
        </div>
    </>
    )
}

export default Teachers;