import React, { useEffect, useState } from 'react';
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";

export default function GenreListPage() {
  const [generos, setGeneros] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [selecionado, setSelecionado] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarGeneros = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`);
        const data = await response.json();
        setGeneros(data.genres);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false)
      }
    };

    buscarGeneros();
  }, []);

  useEffect(() => {
    if (selecionado) {
      const buscarFilmes = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${selecionado}&language=pt-BR`);
          const data = await response.json();
          setFilmes(data.results);
        } catch (error) {
          console.log(error.message);
        }
      };

      buscarFilmes();
    }
  }, [selecionado]);

  const handleChange = (event) => {
    setSelecionado(event.target.value);
  };


  if (loading) {
    return <div>Carregando...</div>;
  }


  return (
    <div>

      <h1 className='text-center text-4xl mb-10 mt-10 text-default'>Selecione um Gênero</h1>

      <div className='w-11/12 float-start text-right'>
        <select onChange={handleChange} value={selecionado} className='text-black  w-64 rounded-lg text-lg p-1'>
          <option value="">Escolha um gênero</option>
          {generos.map((genero) => (
            <option key={genero.id} value={genero.id}>
              {genero.name}
            </option>
          ))}
        </select>      
      </div>

      <div className="w-full">
        <CardContainer titulo="Filmes">
          {
            filmes
              .map(filme => (
                <MovieCard key={filme.id} {...filme} />
              ))
          }
        </CardContainer>
      </div>
    </div>
  );
};
