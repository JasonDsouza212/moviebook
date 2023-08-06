import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistMoviesdetails from '../components/PlaylistMoviesdetails';

const PlaylistMovies = () => {
  const { _id } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setError(null);
      setLoading(true);
      try {  
        const response = await fetch(`http://localhost:4000/api/playlists/${_id}`);
        const data = await response.json();
        console.log(data.movies)
        if (data.movies) {
          setMovies(data.movies);
          setLoading(false); // Update the loading state after fetching data
        } else {
          setError('No movies found.');
          setLoading(false); // Update the loading state even if there's an error
        }
      } catch (error) {
        setError('Oops! Something went wrong.');
        setLoading(false); // Update the loading state in case of an error
      }
    };
    console.log(movies)
    fetchMovieData();
  }, [_id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <PlaylistMoviesdetails key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistMovies;
