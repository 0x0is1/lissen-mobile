import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { decode } from "html-entities";
import handleAlbum from "../../../utils/albumParser";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";

const Card = ({ albumData, index }) => {
	const navigation = useNavigation();
	albumData.title = albumData.title ? albumData.title : albumData.name;

	return (
		<TouchableOpacity delayPressIn={100}
			onPress={() =>
				handleAlbum({
					albumData: albumData,
					image_: albumData.image,
					title_: albumData.title,
					navigation: navigation,
				})
			}
			style={[
				styles.card,
				{ height: index % 3 === 0 ? 240 : 200 },
			]}
			activeOpacity={0.85}
		>
			<ImageBackground
				source={{
					uri: albumData.image
						.replace("150x150", "500x500")
						.replace("50x50", "500x500"),
				}}
				style={styles.image}
				imageStyle={styles.imageOverlay}
			>
				<View style={styles.overlay} />
				<Text style={styles.title}>
					{decode(
						albumData.title.length > 20
							? `${albumData.title.substring(0, 20)}...`
							: albumData.title
					)}
				</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	card: {
		maxWidth: 190,
		minWidth: 170,
		backgroundColor: colors.secondaryColor,
		borderRadius: 10,
		shadowColor: colors.primaryColor,
		shadowOpacity: 0.15,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 3 },
		elevation: 6,
		overflow: "hidden",
		marginHorizontal: 10,
		marginVertical: 12,
	},
	image: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
		position: "relative",
		overflow: "hidden",
	},
	imageOverlay: {
		borderRadius: 10,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: colors.overlayBgPrimary,
		borderRadius: 10,
	},
	title: {
		position: "absolute",
		bottom: 12,
		left: 12,
		fontSize: 18,
		color: colors.secondaryColor,
		letterSpacing: 0.5,
		fontFamily: fonts.poppinsSecondary,
	},
});
