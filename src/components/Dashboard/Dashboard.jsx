import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as pokemonService from "../../services/pokemonService";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [party, setParty] = useState([]);
  const [box, setBox] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catchInput, setCatchInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const partyData = await pokemonService.getParty();
        const boxData = await pokemonService.getBox();

        setParty(partyData);
        setBox(boxData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPokemon();
    }
  }, [user]);

  const handleMovePokemon = async (pokemonId) => {
    setError("");

    try {
      const updatedPokemon = await pokemonService.movePokemon(pokemonId);

      if (updatedPokemon.location === "party") {
        setBox((prev) => prev.filter((p) => p._id !== pokemonId));
        setParty((prev) => [...prev, updatedPokemon]);
      } else {
        setParty((prev) => prev.filter((p) => p._id !== pokemonId));
        setBox((prev) => [...prev, updatedPokemon]);
      }
    } catch (err) {
      setError(err.message || "Unable to move Pokémon");
    }
  };

  const handleReleasePokemon = async (pokemonId) => {
    setError("");

    try {
      await pokemonService.releasePokemon(pokemonId);

      setParty((prev) => prev.filter((p) => p._id !== pokemonId));
      setBox((prev) => prev.filter((p) => p._id !== pokemonId));
    } catch (err) {
      setError(err.message || "Failed to release Pokémon");
    }
  };

  const handleCatchPokemon = async (e) => {
    e.preventDefault();
    setError("");

    if (!catchInput.trim()) return;

    try {
      const newPokemon = await pokemonService.catchPokemon(catchInput);

      if (newPokemon.location === "party") {
        setParty((prev) => [...prev, newPokemon]);
      } else {
        setBox((prev) => [...prev, newPokemon]);
      }

      setCatchInput("");
    } catch (err) {
      setError(err.message || "Failed to catch Pokemon");
    }
  };

  return (
    <main className="dashboard-main">
      <h1>{user.username}'s Pokemon</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading Pokemon...</p>
      ) : (
        <>
          <form onSubmit={handleCatchPokemon}>
            <input
              type="text"
              placeholder="Enter Pokemon Name or ID"
              value={catchInput}
              onChange={(e) => setCatchInput(e.target.value)}
            />
            <button type="submit">Catch Pokemon</button>
          </form>
          <section className="party">
            <h2>Party</h2>
            {party.length === 0 ? (
              <p>Your party is empty</p>
            ) : (
              <ul className="pokemon-grid">
                {party.map((pokemon) => (
                  <PokemonCard
                    key={pokemon._id}
                    pokemon={pokemon}
                    onMove={handleMovePokemon}
                    onRelease={handleReleasePokemon}
                  />
                ))}
              </ul>
            )}
          </section>

          <section className="box">
            <h2>Box</h2>
            {box.length === 0 ? (
              <p>Your box is empty</p>
            ) : (
              <ul className="pokemon-grid">
                {box.map((pokemon) => (
                  <PokemonCard
                    key={pokemon._id}
                    pokemon={pokemon}
                    onMove={handleMovePokemon}
                    onRelease={handleReleasePokemon}
                  />
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default Dashboard;
