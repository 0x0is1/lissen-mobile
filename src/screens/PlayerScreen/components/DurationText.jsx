import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { fonts } from "../../../constants/fonts";
import { colors } from "../../../constants/colors";

const DurationText = ({ currentDuration }) => {
	const { formatTime } = useContext(PlayerContext);
	return <Text style={styles.durationText}>{formatTime(currentDuration)}</Text>;
};

export default DurationText;

const styles = StyleSheet.create({
	durationText: {
		position: "relative",
		fontSize: 16,
		color: colors.primaryColor,
		marginTop: 70,
		marginBottom: 100,
		fontFamily: fonts.poppinsPrimary
	},
});
