import React, { useRef } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
	Animated,
} from "react-native";
import PropTypes from "prop-types";

const PokemonCard = ({ pokemon, onPress }) => {
	const scaleValue = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleValue, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
		onPress();
	};

	return (
		<TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
			<Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
				<Image
					source={{ uri: pokemon.sprites.front_default }}
					style={styles.image}
				/>
				<Text style={styles.name}>{pokemon.name}</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

PokemonCard.propTypes = {
	pokemon: PropTypes.shape({
		sprites: PropTypes.shape({
			front_default: PropTypes.string.isRequired,
		}).isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 15,
		marginVertical: 8,
		marginHorizontal: 16,
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
	},
	image: {
		width: 60,
		height: 60,
	},
	name: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
	},
});

export default PokemonCard;
