import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

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
      const response = await fetch(`http://localhost:4000/api/playlists/all/${user.id}`);
      const data = await response.json();

      if (data) {
        setPlaylists(data);
      } else {
        setError('No playlists found.');
      }
    } catch (error) {
      setError('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchPlaylistData();
  }, [user.id]);



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
      const response = await fetch('http://localhost:4000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlistData),
      });

      if (response.ok) {
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
      const response = await fetch(`http://localhost:4000/api/playlists/${id}`, {
        method: 'DELETE',
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
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul className="playlists-list">
            {playlists.map((playlist) => (
              <li key={playlist._id} className="playlist-item">
                <Link to={`/playlists/${playlist._id}`} className="playlist-link">
                  {playlist.title}
                </Link>
                <button onClick={() => handlePlaylistDelete(playlist._id)}>
                Delete
              </button>
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
