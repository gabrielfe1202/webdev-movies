import React, { useState, useEffect } from 'react';

export default function MyMoviesPage() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    const storedWatchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const storedWatchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
    setWatchedMovies(storedWatchedMovies);
    setWatchlistMovies(storedWatchlistMovies);
  }, []);

  const removeFromList = (movie, list) => {
    const updatedList = list.filter(item => item.id !== movie.id);
    if (list === watchedMovies) {
      setWatchedMovies(updatedList);
      localStorage.setItem('watchedMovies', JSON.stringify(updatedList));
    } else {
      setWatchlistMovies(updatedList);
      localStorage.setItem('watchlistMovies', JSON.stringify(updatedList));
    }
  };

  return (
    <div className="w-10/12 m-auto py-20">
      <h2 className="text-3xl font-bold mb-8">Minha Lista de Filmes</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold">Filmes Assistidos:</h3>
        <div className="grid grid-cols-4 gap-4 pt-4">
          {watchedMovies.map(movie => (
            <div key={movie.id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
                alt={movie.title}
                className="w-[100px] mx-auto"
              />
              <p className="text-sm mt-2">{movie.title}</p>
              <button onClick={() => removeFromList(movie, watchedMovies)} className="text-red-500">Remover</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold">Filmes para Ver Depois:</h3>
        <div className="grid grid-cols-4 gap-4 pt-4">
          {watchlistMovies.map(movie => (
            <div key={movie.id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
                alt={movie.title}
                className="w-[100px] mx-auto"
              />
              <p className="text-sm mt-2">{movie.title}</p>
              <button onClick={() => removeFromList(movie, watchlistMovies)} className="text-red-500">Remover</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
