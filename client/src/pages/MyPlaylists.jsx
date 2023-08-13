import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchPlaylistDataforpage } from '../apicalls/getcall';
import { handleFormSubmit } from '../apicalls/postcalls';


const MyPlaylists = () => {
    const { user } = useAuthContext();
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [btn, setBtn] = useState('Create New Playlist');
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
      if(user){
        fetchPlaylistDataforpage(user, setPlaylists ,setError ,setLoading);
      }
    }, []);

   
    function handlePlaylistDelete(id){
      handlePlaylistDelete(id , user , fetchPlaylistDataforpage , setPlaylists ,setError ,setLoading)
    }
        
    const handleAddPlaylist = () => {
      if (showForm) {
        setBtn('Create New Playlist');
        setShowForm(false);
      } else {
        setBtn('Cancel');
        setShowForm(true);
      }
    };
    
    
    return (
        <div className="playlists-container">
          <h1>Playlists</h1>
          {loading ? (
             <Loader/>
          ) : error ? (
            <Message message={error}/>
          ) : (
            <>
              <ul className="playlists-list">
                {playlists.length==0?(
                <Message message={"No playlists found"}/>
                ):playlists.map((playlist) => (
                  <li key={playlist._id} className="playlist-item">
                    <Link to={`/playlists/${encodeURIComponent(playlist.title)}/${playlist._id}`} className="playlist-link">
                      <div className="playlist-image">
                        {/* Add a placeholder image or set a default image URL */}
                        <img src="" alt="Playlist" />
                      </div>
                      <div className="playlist-info">
                        <p className="playlist-title">{playlist.title}</p>
                      </div>
                    </Link>
                    {user&&user.id === playlist.user_id && (
                          <button className="delete-button" onClick={() => handlePlaylistDelete(playlist._id)}>
                            Delete
                          </button>
                        )}
                  </li>
                ))}
              </ul>
              {user && (
                <button className="add-button" onClick={handleAddPlaylist}>
                {btn}
              </button>
              )}
              {showForm && (
                <form className="playlist-form" onSubmit={(event) =>
                  handleFormSubmit(
                    event,
                    newPlaylistTitle,
                    isPrivate,
                    user,
                    setPlaylists,
                    setError,
                    setLoading,
                    setShowForm,
                    setNewPlaylistTitle,
                    setIsPrivate,
                    setBtn
                  )
                }>
                  <input
                    type="text"
                    value={newPlaylistTitle}
                    onChange={(e) => setNewPlaylistTitle(e.target.value)}
                    placeholder="Playlist Title"
                    required
                  />
                  <br />
                  <label>
                    Private:
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                    />
                    <br />
                  </label>
                  <button type="submit" className="create-button">
                    Create
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      );
}

export default MyPlaylists
