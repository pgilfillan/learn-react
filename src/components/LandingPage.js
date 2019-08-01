import React from 'react';
import Logo from '../img/kepler-icon.png'

function LandingPage(props) {
  return (
    <div>
      <h1>Kepler Dashboard</h1>
      <img src={Logo} alt="kepler-logo" />
    </div>
  );
}

export default LandingPage;