import React from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Profile = () => {
  // Initialize AOS
  AOS.init();

  return (
    <div className="profile-container" data-aos="fade-up">
      <h2 className="profile-title">User Profile</h2>
      <ul className="profile-list">
        <li className="profile-list-item" data-aos="fade-up" data-aos-delay="100">
          <Link className="profile-link" to="/resetpassword">Reset Password</Link>
        </li>
        <li className="profile-list-item" data-aos="fade-up" data-aos-delay="200">
          <Link className="profile-link" to="/myplaylists">My PlayLists</Link>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
