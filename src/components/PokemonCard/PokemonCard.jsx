const PokemonCard = ({ pokemon }) => {
  return (
    <li>
      <p>
        <strong>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </strong>
      </p>
      <p>{pokemon.types.join(", ")}</p>
    </li>
  );
};

export default PokemonCard;
