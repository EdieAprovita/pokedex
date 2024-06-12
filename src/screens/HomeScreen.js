import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import PokemonList from "../components/PokemonList";
import backgroundImage from "../../assets/pokemon.webp";

const HomeScreen = ({ navigation }) => {
	return (
		<ImageBackground source={backgroundImage} style={styles.background}>
			<View style={styles.overlay}>
				<Text style={styles.title}>Pokemon-Pokedex</Text>
				<PokemonList navigation={navigation} />
			</View>
		</ImageBackground>
	);
};

HomeScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		padding: 20,
		borderRadius: 10,
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		borderRadius: 10,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 20,
		color: "#ff4500", // Color OrangeRed
	},
});

export default HomeScreen;
