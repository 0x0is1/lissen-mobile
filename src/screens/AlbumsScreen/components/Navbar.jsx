import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants/colors";

const Navbar = () => {
	const navigator = useNavigation();
	const handleSearch = () => {
		navigator.navigate("SearchScreen");
	};
	const handleDashboard = () => {
		navigator.navigate("DashboardScreen");
	};
	return (
		<View style={styles.searchInput}>
			<TouchableOpacity onPress={handleDashboard}>
				<Feather name="menu" size={25} color={colors.primaryColor} />
			</TouchableOpacity>
			<TouchableOpacity onPress={handleSearch}>
				<Feather name="search" size={25} color={colors.primaryColor} />
			</TouchableOpacity>
		</View>
	);
};

export default Navbar;

const styles = StyleSheet.create({
	searchInput: {
		marginTop: 15,
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 15,
		justifyContent: "space-between",
	},
});
