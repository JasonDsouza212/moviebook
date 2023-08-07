import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('Marvel'); 
  const [val, setVal] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(`https://moviebook-backend.onrender.com/api/playlists/myplaylists/${user.id}`,{
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        });
        const data = await response.json();
        if (data) {
          const playlistTitles = data.map((playlist) => playlist.title);
          setPlaylists(playlistTitles);
          console.log(playlistTitles);
        } else {
          setPlaylists([]);
          console.log('No playlist found.');
        }
      } catch (error) {
        console.error('Oops! Something went wrong.', error);
      }
    };
  
    fetchPlaylistData();
  }, []);
  

  useEffect(() => {
    const fetchMovieData = async () => {
      setError(null);
      setLoading(true);
      try {  
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=ad07eb`);
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setError('No movies found.');
        }
      } catch (error) {
        setError('Oops! Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [searchTerm]);

  // Function to handle the search button click
  const handleSearchButtonClick = () => {
    setSearchTerm(val.trim());
  };

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <div className='MoviesPage'>
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          value={val}
          onChange={handleSearchInputChange}
          placeholder="Search movies..."
        />
        <button id="searchButton" onClick={handleSearchButtonClick}>Search</button>
      </div>

      {loading ? (
        <Loader/>
      ) : error ? (
         <Message message={error}/>
      ) : (
        <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            playlists={playlists}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default Movies;
