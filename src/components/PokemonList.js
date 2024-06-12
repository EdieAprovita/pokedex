import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, UIManager, LayoutAnimation, Platform } from "react-native";
import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";
import { fetchPokemonList, fetchPokemonDetails } from "../services/api";
import Loader from "./Loader";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PokemonList = ({ navigation }) => {
	const [pokemonList, setPokemonList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPokemonList = async () => {
			const data = await fetchPokemonList();
			const detailedData = await Promise.all(
				data.results.map(pokemon => fetchPokemonDetails(pokemon.name))
			);
			setPokemonList(detailedData);
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
			setLoading(false);
		};

		getPokemonList();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<FlatList
			data={pokemonList}
			renderItem={({ item }) => (
				<PokemonCard
					pokemon={item}
					onPress={() => navigation.navigate("Details", { pokemon: item })}
				/>
			)}
			keyExtractor={item => item.name}
			contentContainerStyle={styles.list}
		/>
	);
};

PokemonList.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};

const styles = StyleSheet.create({
	list: {
		padding: 10,
	},
	loading: {
		fontSize: 18,
		textAlign: "center",
		marginTop: 20,
	},
});

export default PokemonList;
