const API_URL = "https://pokeapi.co/api/v2/";

export const fetchPokemonList = async () => {
	try {
		const response = await fetch(`${API_URL}pokemon?limit=151`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data", error);
	}
};

export const fetchPokemonDetails = async name => {
	try {
		const response = await fetch(`${API_URL}pokemon/${name}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data", error);
	}
};
