import "./GameCard.css";

const GameCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={"card"}>
      <div className={flipped ? "flipped" : ""}>
        <img className={"front"} src={card.src} alt={"card front"} />
        <img
          className={"back"}
          src={"/images/cover.jpeg"}
          alt="card cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default GameCard;
