import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistMoviesdetails from '../components/PlaylistMoviesdetails';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const PlaylistMovies = () => {
  const { _id, title } = useParams();

  console.log(title)

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner]= useState(false)
  const {user}= useAuthContext()

  const fetchMovieData = async () => {
    setError(null);
    setLoading(true);
    try {  
      const response = await fetch(`https://moviebook-backend.onrender.com/api/playlists/${_id}`,{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if(data.user_id===user.id){
        setIsOwner(true)
      }else {
        setIsOwner(false)
      }
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

  useEffect(() => {
    fetchMovieData();
    console.log(movies)

  }, [_id]);

  return (
<div>
  {loading ? (
     <Loader/>
  ) : error ? (
    <Message message={error}/>
  ) : movies.length > 0 ? (
    <div className="movies-grid">
      {movies.map((movie) => (
        <PlaylistMoviesdetails key={movie._id} movie={movie} playlistname={title}  fetchMovieData={fetchMovieData} isOwner={isOwner} user_id={user.id}/>
      ))}
    </div>
  ) : (
    <Message message={"No movies found in this playlist"}/>
  )}
</div>
  );
};

export default PlaylistMovies;
