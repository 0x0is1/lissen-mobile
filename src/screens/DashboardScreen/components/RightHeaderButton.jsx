import { StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React from "react";

const RightHeaderButton = ({ navigation }) => {
	return (
		<TouchableOpacity
			style={{ marginRight: 15 }}
			onPress={() => navigation.navigate("SearchScreen")}
		>
			<Feather name="search" size={25} color="black" />
		</TouchableOpacity>
	);
};

export default RightHeaderButton;

const styles = StyleSheet.create({});
