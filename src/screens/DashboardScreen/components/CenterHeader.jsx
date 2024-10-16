import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { expo } from "../../../../app.json";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";

const CenterHeader = () => {
	return (
		<View style={styles.title}>
			<Image
				source={require("../../../../assets/icons8-musical-dotted/icons8-musical-100.png")}
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
		width: 35,
		height: 35,
		marginHorizontal: 2,
	},
	text: {
		fontSize: 24,
		fontFamily: fonts.poppinsSecondary,
		color: colors.categoryColorPrimary,
	},
});
