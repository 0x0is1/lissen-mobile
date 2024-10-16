import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";

const DurationText = ({ currentDuration }) => {
	const { formatTime } = useContext(PlayerContext);
	return <Text style={styles.durationText}>{formatTime(currentDuration)}</Text>;
};

export default DurationText;

const styles = StyleSheet.create({
	durationText: {
		position: "relative",
		fontSize: 16,
		fontFamily: "Poppins-Regular",
		color: "black",
		marginTop: 70,
		marginBottom: 100,
	},
});
