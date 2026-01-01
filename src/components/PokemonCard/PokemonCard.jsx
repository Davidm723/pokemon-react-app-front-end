const PokemonCard = ({ pokemon, onMove, onRelease }) => {
  return (
    <li>
      <p>
        <strong>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </strong>
      </p>
      <p>{pokemon.types.join(", ")}</p>

      <button onClick={() => onMove(pokemon._id)}>
        Move to {pokemon.location === "party" ? "Box" : "Party"}
      </button>

      <button onClick={() => onRelease(pokemon._id)}>Realease</button>
    </li>
  );
};

export default PokemonCard;
