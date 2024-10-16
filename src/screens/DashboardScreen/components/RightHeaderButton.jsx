import { StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React from "react";

const RightHeaderButton = ({ navigation, color }) => {
	return (
		<TouchableOpacity activeOpacity={1}
			style={{ marginRight: 15 }}
			onPress={() => navigation.navigate("SearchScreen")}
		>
			<Feather name="search" size={25} color={color} />
		</TouchableOpacity>
	);
};

export default RightHeaderButton;

const styles = StyleSheet.create({});
