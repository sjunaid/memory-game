import React from 'react';

const Header = ({ startGame }) => (
    <header>
        <h1>Memory Game</h1>
        <button onClick={startGame} className="start-button">Start Over</button>
  </header>
);

export default Header;