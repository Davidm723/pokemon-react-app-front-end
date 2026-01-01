import { useEffect, useContext, useState, use } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as pokemonService from "../../services/pokemonService";
import PokemonCard from "../PokemonCard/PokemonCard";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [party, setParty] = useState([]);
  const [box, setBox] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main>
      <h1>{user.username}'s Pokemon</h1>

      {loading ? (
        <p>Loading Pokemon...</p>
      ) : (
        <>
          <section>
            <h2>Party</h2>
            {party.length === 0 ? (
              <p>Your party is empty</p>
            ) : (
              <ul>
                {party.map((pokemon) => (
                  <PokemonCard key={pokemon._id} pokemon={pokemon} />
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2>Box</h2>
            {box.length === 0 ? (
              <p>Your box is empty</p>
            ) : (
              <ul>
                {box.map((pokemon) => (
                  <PokemonCard key={pokemon._id} pokemon={pokemon} />
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
