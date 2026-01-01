const PokemonCard = ({ pokemon, onMove }) => {
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
    </li>
  );
};

export default PokemonCard;
