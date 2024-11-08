import { useState } from 'react'
import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path, backdrop_path }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative w-64 transition-all duration-700 delay-75 ease-in-out hover:w-4/12 bg-cover bg-center" 
            style={{
                backgroundImage: isHovered ? `url(https://image.tmdb.org/t/p/w1280${backdrop_path})` : `url(https://image.tmdb.org/t/p/w154/${poster_path})`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* <h2>{title}</h2> */}            
            <img src={`https://image.tmdb.org/t/p/w154${poster_path}`} className="opacity-0 w-64" />
            {/* <img src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`} className="image2"/> */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-black p-4">
                <p className='pb-4'>{title}</p>
                <Link to={`/movies/${id}`} className='p-2 bg-default rounded-lg'>Saiba mais</Link>
            </div>
            
        </div>
    )

}