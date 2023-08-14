import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';
import { fetchPlaylistData2, fetchPlaylistDataofnonlogin } from '../apicalls/getcall';
import { handleFormSubmit } from '../apicalls/postcalls';
import { handlePlaylistedit } from '../apicalls/putcalls';
import { handlePlaylistDelete2 } from '../apicalls/deletecalls';

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
    console.log('Modal Input:', modalInput);
    // Close the modal
    handleCloseModal();
  };

  
  useEffect(() => {
    if (user) {
      fetchPlaylistData2(setError,setLoading,user,setPlaylists);
    } else {
      fetchPlaylistDataofnonlogin(setError,setLoading,setPlaylists);
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
    
  function handleFormSubmitfunc(event){
    handleFormSubmit(event ,newPlaylistTitle ,isPrivate , user , setPlaylists ,setError ,setLoading ,setShowForm , setNewPlaylistTitle ,setIsPrivate ,setBtn )
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
                  </Link>
                  <div className="playlist-info">
                    <p className="playlist-title">
                      {playlist.title}
                      {user && user.id === playlist.user_id && (
                        <button className='edit_btn' onClick={() => handleShowModal(playlist._id)}><i className="ri-pencil-fill"></i></button>
                      )}
                    </p>
                  </div>
                
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
                        <button onClick={()=>handlePlaylistedit(modalInput,user,setError,setLoading,setPlaylists,setTempid,setShowModal,setModalInput,tempid)}>Submit</button>
                      </form>
                    </div>
                  </div>
                )}

                {user && user.id === playlist.user_id && (
                  <button
                    className="delete-button"
                    onClick={() => handlePlaylistDelete2(playlist._id, user , setPlaylists ,setError ,setLoading)}
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
            <form className="playlist-form" onSubmit={handleFormSubmitfunc}>
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
