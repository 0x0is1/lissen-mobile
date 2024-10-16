import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";

const Navbar = ({ setSearchInput }) => {
	const navigator = useNavigation();
	const handleBack = () => {
		navigator.goBack();
	};
	return (
		<View style={styles.searchContainer}>
			<TouchableOpacity activeOpacity={1} onPress={handleBack}>
				<Ionicons name="arrow-back" size={25} color={colors.primaryColor} />
			</TouchableOpacity>
			<TextInput
				style={styles.searchInputBox}
				placeholder="Type songs, albums, artists ..."
				placeholderTextColor={colors.placeholder}
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
		backgroundColor: colors.navbarBg,
		margin: 10,
		marginTop: 25,
	},
	searchInputBox: {
		flex: 1,
		marginLeft: 15,
		backgroundColor: colors.secondaryBackgroundColor,
		borderRadius: 25,
		paddingVertical: 10,
		paddingHorizontal: 15,
		fontSize: 16,
		color: colors.drawerItemInactiveBg,
		borderWidth: 1,
		borderColor: colors.shadowSecondary,
		fontFamily: fonts.poppinsPrimary
	},
});
