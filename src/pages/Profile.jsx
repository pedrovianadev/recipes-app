import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : null;

  return (
    <div>
      <Header
        title="Profile"
        haveSearch={ false }
      />
<<<<<<< HEAD
=======
      <div>
        <h2 data-testid="profile-email">
          { email }
        </h2>
        <Link
          to="/done-recipes"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </Link>
        <Link
          to="/favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </Link>
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </Link>
      </div>
>>>>>>> 16a115cd67a7999e3b3744c5cebf87117e4bb48a
      <Footer />
    </div>
  );
}

export default Profile;
