import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { expo } from "../../../../app.json";

const CenterHeader = () => {
	return (
		<View style={styles.title}>
			<Image
				source={require("../../../../assets/icon.png")}
				style={styles.icon}
			/>
			<Text style={[styles.text]}>
				{expo.displayName}
			</Text>
		</View>
	);
};

export default CenterHeader;

const styles = StyleSheet.create({
	title: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		minWidth: "100%",
	},
	icon: {
		width: 30,
		height: 30,
		marginRight: 8,
	},
	text: {
		fontSize: 22,
		fontFamily: "Poppins-Bold",
		color: "#46494d"
	},
});
