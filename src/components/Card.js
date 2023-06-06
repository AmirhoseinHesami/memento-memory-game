function Card({ image, selected, onClick }) {
  return (
    <div className="card">
      <div className={selected && "selected"}>
        <img src={image} className="card-face" alt="" />

        <img
          src="/assets/stack.png"
          className="card-back"
          alt=""
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default Card;
