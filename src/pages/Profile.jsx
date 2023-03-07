import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : null;

  return (
    <div>
      <Header
        title="Profile"
        haveSearch={ false }
      />
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
      <Footer />
    </div>
  );
}

export default Profile;
