import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [btn, setBtn] = useState('Create New Playlist');
  const [tempid, setTempid] = useState(''); // Added tempid state

  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Modal Input State
  const [modalInput, setModalInput] = useState('');

  // Show Modal with playlist id
  const handleShowModal = (playlistid) => {
    setShowModal(true);
    setTempid(playlistid); // Set tempid with the playlist id
  };

  // Hide Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalInput('');
  };

  // Modal Form Submit
  const handleModalSubmit = () => {
    // Perform actions on submit
    // For example, fire a function to handle the modal form submission
    // You can access the modalInput value here
    console.log('Modal Input:', modalInput);

    // Close the modal
    handleCloseModal();
  };

  const fetchPlaylistData = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/playlists/all/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
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
      const response = await fetch(`http://localhost:4000/api/playlists/all`, {});
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
    if (user) {
      fetchPlaylistData();
    } else {
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
      const response = await fetch('http://localhost:4000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(playlistData),
      });

      if (response.ok) {
        toast.success("Playlist created successfully")
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
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        toast.success('Playlist Deleted')
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
  }

  async function handlePlaylistedit() {
    try {
      const requestData = {
        title: modalInput,
        user_id: user.id,
      };
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(requestData)
      };
  
      const response = await fetch(`http://localhost:4000/api/playlists/updateplaylist/${tempid}`, requestOptions);
      const data = await response.json();
  
      console.log('Response:', data);
      await fetchPlaylistData(); // Fetch updated playlists
      
      await toast.success("Playlist name changed successfully")
      
      
    } catch (error) {
      setError('Playlist name change failed');
    }finally{
      setTempid(''); // Reset tempid
      setShowModal(false);
      setModalInput("");
    }
  

  }
  

  return (
    <div className="playlists-container">
      <h1>Playlists</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <>
          <ul className="playlists-list">
            {playlists.map((playlist) => (
              <li key={playlist._id} className="playlist-item">
                <Link
                  to={`/playlists/${encodeURIComponent(playlist.title)}/${playlist._id}`}
                  className="playlist-link"
                >
                  <div className="playlist-image">
                    {/* Add a placeholder image or set a default image URL */}
                    <img src="https://rb.gy/jiek0" alt="Playlist" />
                  </div>
                  <div className="playlist-info">
                    <p className="playlist-title">
                      {playlist.title}
                      {user && user.id === playlist.user_id && (
                        <button className='edit_btn' onClick={() => handleShowModal(playlist._id)}><i className="ri-pencil-fill"></i></button>
                      )}
                    </p>
                  </div>
                </Link>
                {showModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <span className="modal-close" onClick={handleCloseModal}>
                        &times;
                      </span>
                      <form onSubmit={handleModalSubmit}>
                        <label>Edit Playlist:</label>
                        <input
                          type="text"
                          value={modalInput}
                          onChange={(e) => setModalInput(e.target.value)}
                        />
                        <button onClick={handlePlaylistedit}>Submit</button>
                      </form>
                    </div>
                  </div>
                )}

                {user && user.id === playlist.user_id && (
                  <button
                    className="delete-button"
                    onClick={() => handlePlaylistDelete(playlist._id)}
                  >
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
