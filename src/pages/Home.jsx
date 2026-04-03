import WeatherWidget from "../components/WeatherWidget";

const Home = () => {
    return(
    <>
        <WeatherWidget />
        <h1 className="title-home"><span className="title">"Corcheas"</span> - Escuela de música</h1>
        <div className="home-container">
        <main>
            <h2>· Quiénes somos:</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h2>· Nuestra metodología:</h2>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Aliquam sit amet.</p>
        </main>
        
    </div>
    </>
    )
}

export default Home;