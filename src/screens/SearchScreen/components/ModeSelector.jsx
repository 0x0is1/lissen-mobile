import { StyleSheet, View } from "react-native";
import React from "react";
import SwitchSelector from "react-native-switch-selector";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";

const ModeSelector = ({ setSearchType, searchType }) => {
	const options = [
		{ label: "Playlists", value: 0 },
		{ label: "Songs", value: 1 },
		{ label: "Albums", value: 2 },
		{ label: "Artists", value: 4 },
	];

	return (
		<View style={styles.selectorContainer}>
			<SwitchSelector
				options={options}
				initial={searchType}
				onPress={(value) => setSearchType(value)}
				hasPadding
				buttonColor={colors.primaryColor}
				textColor={colors.quartiaryColor}
				height={48}
				fontSize={14}
				borderRadius={25}
				textStyle={{ "fontFamily": fonts.poppinsPrimary }}
				selectedTextStyle={{ "fontFamily": fonts.poppinsPrimary }}
			/>
		</View>
	);
};

export default ModeSelector;

const styles = StyleSheet.create({
	selectorContainer: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
});
