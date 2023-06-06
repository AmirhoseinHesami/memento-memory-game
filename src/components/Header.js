import { useEffect } from "react";

function Header({ wins, handleNewGame }) {
  useEffect(
    function () {
      document.title = `${wins} wins`;
    },
    [wins]
  );

  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h3>Memory Game</h3>
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
}

export default Header;
