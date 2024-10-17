import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants/colors";

const CustomStatusBar = () => {
	const navigator = useNavigation();
	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity activeOpacity={1}
				onPress={() => {
					navigator.goBack();
				}}
				style={styles.iconLeft}
			>
				<Ionicons name="chevron-back" size={25} color={colors.primaryColor} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					ToastAndroid.show("Not implemented yet", ToastAndroid.SHORT);
				}}
				style={styles.iconRight}
			>
				<Ionicons name="information" size={25} color={colors.primaryColor} />
			</TouchableOpacity>
		</View>
	);
};

export default CustomStatusBar;

const styles = StyleSheet.create({
	buttonContainer: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		top: 25,
		width: "100%",
		paddingHorizontal: 20,
	},
	iconLeft: {
		borderRadius: 40,
		alignSelf: "flex-start",
	},
	iconRight: {
		borderRadius: 40,
		alignSelf: "flex-end",
	},
});
