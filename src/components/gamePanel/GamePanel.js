import { useState, useEffect } from "react";
import GameCard from "../gameCard/GameCard";
import classes from "./GamePanel.module.css";

const cardImages = [
  { src: "/images/football.png" },
  { src: "/images/sport-1.png" },
  { src: "/images/sport-2.png" },
  { src: "/images/trophy.png" },
  { src: "/images/sport-shoes.png" },
  { src: "/images/weightlifting.png" },
];

const GamePanel = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [cardDisabled, setCardDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setCardDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setCardDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button onClick={shuffleCards}>New Game</button>

      <div className={classes.gamePanel}>
        {cards.map((card) => (
          <GameCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={cardDisabled}
          />
        ))}
      </div>
      <p key={"turns"} className={classes.turns}>
        Turns: {turns}
      </p>
    </>
  );
};

export default GamePanel;
