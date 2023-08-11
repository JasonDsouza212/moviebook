import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout}= useLogout()
  const {user}= useAuthContext()

  const handleClick =()=>{
    logout()
    alert("Logged out successfully")
    window.location.href = '/';
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Movie Book</h1>
        </Link>
        <nav>
        <Link className='playlist_nav' to="/playlists">Playlist</Link>
        {user &&(
          <div>
            <Link className='profile_link' to="/profile"><i class="ri-account-circle-fill"></i>{user.email.split('@')[0].toUpperCase()}</Link>
            <button onClick={handleClick}>
                Log out
            </button>
          </div>
        )}
        {!user &&(
          <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
        )}  
        </nav>
      </div>
    </header>
  )
}

export default Navbar