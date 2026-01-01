const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pokemon`;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

const catchPokemon = async (nameOrId) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ nameOrId }),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.pokemon;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getParty = async () => {
  try {
    const res = await fetch(`${BASE_URL}/party`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getBox = async () => {
  try {
    const res = await fetch(`${BASE_URL}/box`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const movePokemon = async (pokemonId) => {
  try {
    const res = await fetch(`${BASE_URL}/${pokemonId}/move`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const releasePokemon = async (pokemonId) => {
  try {
    const res = await fetch(`${BASE_URL}/${pokemonId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { catchPokemon, getParty, getBox, movePokemon, releasePokemon };
