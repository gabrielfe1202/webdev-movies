import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);

    const addToWatched = () => {
        const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        watchedMovies.push(movie);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    };

    const addToWatchlist = () => {
        const watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
        watchlistMovies.push(movie);
        localStorage.setItem('watchlistMovies', JSON.stringify(watchlistMovies));
    };


    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
                const movieData = await movieResponse.json();
                setMovie(movieData);

                const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`);
                const castData = await castResponse.json();
                setCast(castData.cast);

                const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`);
                const trailerData = await trailerResponse.json();
                const officialTrailer = trailerData.results.find(video => video.type === "Trailer");
                setTrailer(officialTrailer);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.belongs_to_collection?.backdrop_path})`,
                }}
                className="w-full h-[45vh] bg-cover bg-center"
            ></div>
            <div className="w-10/12 m-auto flex flex-row pt-20 pb-20 justify-center">
                <img
                    src={`https://image.tmdb.org/t/p/w154/${movie.belongs_to_collection?.poster_path}`}
                    className="h-[550px] w-auto"
                    alt={movie.title}
                />
                <div className="w-6/12 p-12">
                    <h1 className="pb-6 text-5xl text-default font-bold">{movie.title}</h1>
                    <p className="text-lg">{movie.overview}</p>
                    <p className="text-lg font-semibold">Avaliação: {movie.vote_average} / 10</p>
                    <p className="text-lg font-semibold">Data de lançamento: {movie.release_date}</p>

                    <div className="pt-8">
                        <button onClick={addToWatched} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Marcar como Assistido</button>
                        <button onClick={addToWatchlist} className="bg-blue-500 text-white px-4 py-2 rounded">Adicionar à Lista de Para Ver</button>
                    </div>

                    <h2 className="pt-8 text-2xl font-bold">Elenco:</h2>
                    <div className="grid grid-cols-4 gap-4 pt-4">
                        {cast.slice(0, 8).map(actor => (
                            <div key={actor.cast_id} className="text-center">
                                <img
                                    src={`https://image.tmdb.org/t/p/w154/${actor.profile_path}`}
                                    alt={actor.name}
                                    className="w-[100px] rounded-full mx-auto"
                                />
                                <p className="text-sm mt-2">{actor.name}</p>
                                <p className="text-sm text-gray-500">{actor.character}</p>
                            </div>
                        ))}
                    </div>

                    {trailer && (
                        <div className="pt-8">
                            <h2 className="text-2xl font-bold">Trailer:</h2>
                            <div className="pt-4">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title="Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
