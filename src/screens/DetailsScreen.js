import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import PropTypes from "prop-types";
import { fetchPokemonDetails } from "../services/api";
import Loader from "../components/Loader";

const DetailsScreen = ({ route }) => {
	const { pokemon } = route.params;
	const [details, setDetails] = useState(null);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const getPokemonDetails = async () => {
			const data = await fetchPokemonDetails(pokemon.name);
			setDetails(data);
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}).start();
		};

		getPokemonDetails();
	}, [pokemon]);

	if (!details) return <Loader />;

	return (
		<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
			<Text style={styles.name}>{details.name}</Text>
			<Image source={{ uri: details.sprites.front_default }} style={styles.image} />
			<Text style={styles.info}>Height: {details.height}</Text>
			<Text style={styles.info}>Weight: {details.weight}</Text>
			<Text style={styles.info}>Base Expirience: {details.base_experience}</Text>
			<Text style={styles.info}>
				Abilities:{" "}
				{details.abilities.map(ability => ability.ability.name).join(", ")}
			</Text>
		</Animated.View>
	);
};

DetailsScreen.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			pokemon: PropTypes.shape({
				name: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f0f8ff",
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 10,
		color: "#4b0082",
	},
	image: {
		width: 200,
		height: 200,
		alignSelf: "center",
		marginVertical: 20,
		borderRadius: 100,
		borderColor: "#4b0082",
		borderWidth: 2,
	},
	info: {
		fontSize: 18,
		marginBottom: 10,
		color: "#333",
	},
	loading: {
		fontSize: 18,
		textAlign: "center",
		marginTop: 20,
	},
});

export default DetailsScreen;
