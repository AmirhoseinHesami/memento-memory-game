import { useState, useEffect } from "react";
import shuffle from "./utilities/shuffle";
import Card from "./components/Card";
import Header from "./components/Header";

function App() {
  // Cards array from assets
  const [cards, setCards] = useState(shuffle);
  // First Selection
  const [pickOne, setPickOne] = useState(null);
  // Second Selection
  const [pickTwo, setPickTwo] = useState(null);
  // Delay handler
  const [disabled, setDisabled] = useState(false);
  // Win
  const [wins, setWins] = useState(0);

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  // Handle card selection
  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  // Start over
  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [pickOne, pickTwo, cards]);

  // If player has found all matches
  useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      setWins(wins + 1);
      setCards(shuffle);
      handleTurn();
    }
  }, [cards, wins]);

  return (
    <>
      <Header wins={wins} handleNewGame={handleNewGame} />

      <div className="grid">
        {cards.map((card) => {
          const { id, image, matched } = card;

          return (
            <Card
              key={id}
              selected={card === pickOne || card === pickTwo || matched}
              image={image}
              onClick={() => {
                handleClick(card);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
