import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistMoviesdetails from '../components/PlaylistMoviesdetails';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchMovieDatafornonlogin, fetchMovieDataindividual } from '../apicalls/getcall';

const PlaylistMovies = () => {
  const { _id, title } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner]= useState(false)
  const {user}= useAuthContext()

  useEffect(() => {
    if(user){
      fetchMovieDataindividual(_id,setError,setLoading,user,setIsOwner,setMovies);
    }else{
      fetchMovieDatafornonlogin(_id,setError,setLoading,setMovies)
    }

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
        <PlaylistMoviesdetails key={movie._id} 
        movie={movie} 
        playlistname={title}  
        fetchMovieData={fetchMovieDataindividual} 
        _id={_id}
        isOwner={isOwner} 
        setError={setError}
        setLoading={setLoading}
        setIsOwner={setIsOwner}
        setMovies={setMovies}
        user_id={user?user.id:""}/>
      ))}
    </div>
  ) : (
    <Message message={"No movies found in this playlist"}/>
  )}
</div>
  );
};

export default PlaylistMovies;
