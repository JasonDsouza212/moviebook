import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [btn, setBtn] = useState('Create New Playlist');

  const fetchPlaylistData = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`https://moviebook-backend.onrender.com/api/playlists/all/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setPlaylists(data);
      } else {
        setError('No playlists found.');
        setPlaylists([]); // Set an empty array if data is not an array
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
      setPlaylists([]); // Set an empty array in case of error
    } finally {
      setLoading(false);
    }
  };
  const fetchPlaylistDataofnonlogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`https://moviebook-backend.onrender.com/api/playlists/all`, {
      });
      const data = await response.json();

      if (data) {
        setPlaylists(data);
      } else {
        setError('No playlists found.');
        setPlaylists([]); // Set an empty array if data is not an array
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
      setPlaylists([]); // Set an empty array in case of error
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if(user){
      fetchPlaylistData();
    }else{
      fetchPlaylistDataofnonlogin();
    }
  }, []);

  const handleAddPlaylist = () => {
    if (showForm) {
      setBtn('Create New Playlist');
      setShowForm(false);
    } else {
      setBtn('Cancel');
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const playlistData = {
      title: newPlaylistTitle,
      private: isPrivate,
      user_id: user.id,
    };
    try {
      const response = await fetch('https://moviebook-backend.onrender.com/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(playlistData),
      });

      if (response.ok) {
        alert("Playlist created successfully")
        // Playlist created successfully
        console.log('Playlist created successfully.');
        // Fetch the updated playlists
        fetchPlaylistData();
      } else {
        // Handle error response
        console.error('Error creating playlist.');
        // Perform any error handling or show error message here
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      // Handle any network or other errors here
    }

    setShowForm(false);
    setNewPlaylistTitle('');
    setIsPrivate(false);
    setBtn('Create New Playlist');
  };

  async function handlePlaylistDelete(id) {
    try {
      const response = await fetch(`https://moviebook-backend.onrender.com/api/playlists/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        alert('Playlist Deleted');
        // Playlist was deleted successfully, you may choose to update the UI or fetch updated playlists list
        console.log('Playlist deleted successfully.');
        // Perform any additional actions or show success message here
        fetchPlaylistData(); // Fetch the updated playlists
      } else {
        console.error('Error deleting playlist.');
        // Perform any error handling or show error message here
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
      // Handle any network or other errors here
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
            {playlists.map((playlist) => (
              <li key={playlist._id} className="playlist-item">
                <Link to={`/playlists/${encodeURIComponent(playlist.title)}/${playlist._id}`} className="playlist-link">
                  <div className="playlist-image">
                    {/* Add a placeholder image or set a default image URL */}
                    <img src="data:image/png;base64,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" alt="Playlist" />
                  </div>
                  <div className="playlist-info">
                    <p className="playlist-title">{playlist.title}</p>
                  </div>
                </Link>
                {user.id === playlist.user_id && (
                      <button className="delete-button" onClick={() => handlePlaylistDelete(playlist._id)}>
                        Delete
                      </button>
                    )}
              </li>
            ))}
          </ul>
          <button className="add-button" onClick={handleAddPlaylist}>
            {btn}
          </button>
          {showForm && (
            <form className="playlist-form" onSubmit={handleFormSubmit}>
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
};

export default Playlists;
