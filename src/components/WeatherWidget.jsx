import { useEffect, useState } from "react";

const WeatherWidget = () => {
    const [data, setData] = useState(null);
    const apiUrl = 'https://escuela-musica-back.onrender.com/api/weather'
    const city = data?.location?.name;
    const temp = data?.current?.temp_c;
    
    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            if(!response.ok) {
                throw new Error('Error obteniendo la información del tiempo.')
            }
            const resData = await response.json();
            setData(resData);          
        } catch (error) {
            console.log(error)
        }
    };
    
    useEffect(() => {
        fetchData()
    },[]);
    
    return(
        <div className="weather-container">
        {data === null
        ? <p>Cargando...</p>
        :
            <>
                <h3>{city},</h3>
                <img src="/temp.svg"/>
                <h3>{temp} ºC</h3>
                <p>· Hoy es un buen día para empezar a tocar un instrumento ·</p>
            </>
        }
        </div>
    );
};

export default WeatherWidget;