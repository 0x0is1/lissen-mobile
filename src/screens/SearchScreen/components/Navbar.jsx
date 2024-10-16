import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ setSearchInput }) => {
	const navigator = useNavigation();
	const handleBack = () => {
		navigator.goBack();
	};
	return (
		<View style={styles.searchContainer}>
			<TouchableOpacity onPress={handleBack}>
				<Ionicons name="arrow-back" size={25} color="black" />
			</TouchableOpacity>
			<TextInput
				style={styles.searchInputBox}
				placeholder="Type songs, albums, artists ..."
				placeholderTextColor="#999"
				onChangeText={(input) => setSearchInput(input)}
			/>
		</View>
	);
};

export default Navbar;

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		backgroundColor: "#f0f0f0",
		margin: 10,
		marginTop: 25,
	},
	searchInputBox: {
		flex: 1,
		marginLeft: 15,
		backgroundColor: "#fff",
		borderRadius: 25,
		paddingVertical: 10,
		paddingHorizontal: 15,
		fontSize: 16,
		color: "#333",
		borderWidth: 1,
		borderColor: "#ddd",
		fontFamily: "Poppins-Regular"
	},
});
