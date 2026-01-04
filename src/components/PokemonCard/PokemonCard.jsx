import { useState } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, onMove, onRelease }) => {
  const [showStats, setShowStats] = useState(false);

  return (
    <li className="pokemon-card">
      <h3 onClick={() => setShowStats((prev) => !prev)}>{pokemon.name}</h3>

      <p>{pokemon.types.join(", ")}</p>

      {showStats && (
        <ul className="stats">
            {Object.entries(pokemon.stats).map(([stat, value]) => (
                <li key={stat}>
                    <strong>{stat}:</strong> {value}
                </li>
            ))}
        </ul>
      )}

      <button onClick={() => onMove(pokemon._id)}>
        Move to {pokemon.location === "party" ? "Box" : "Party"}
      </button>

      <button onClick={() => onRelease(pokemon._id)}>Release</button>
    </li>
  );
};

export default PokemonCard;
