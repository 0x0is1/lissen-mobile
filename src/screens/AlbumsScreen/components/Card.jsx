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
	const { title, name, image } = albumData;

	const albumTitle = title || name;
	const displayTitle = decode(
		albumTitle.length > 25 ? `${albumTitle.substring(0, 25)}...` : albumTitle
	);

	const optimizedImageUri = image
		.replace("150x150", "500x500")
		.replace("50x50", "500x500");

	const handlePress = () =>
		handleAlbum({
			albumData,
			image_: image,
			title_: albumTitle,
			navigation,
		});

	const cardHeight = index % 3 === 0 ? 240 : 200;

	return (
		<TouchableOpacity
			delayPressIn={100}
			onPress={handlePress}
			style={[styles.card, { height: cardHeight }]}
			activeOpacity={0.85}
		>
			<ImageBackground
				source={{ uri: optimizedImageUri }}
				style={styles.image}
				imageStyle={styles.imageOverlay}
			>
				<View style={styles.overlay} />
				<Text style={styles.title}>{displayTitle}</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.secondaryColor,
		borderRadius: 10,
		shadowColor: colors.primaryColor,
		shadowOpacity: 0.15,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 3 },
		elevation: 6,
		overflow: "hidden",
		marginHorizontal: 6,
		marginVertical: 6,
	},
	image: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
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
		bottom: 8,
		left: 8,
		fontSize: 16,
		color: colors.secondaryColor,
		fontFamily: fonts.poppinsSecondary,
	},
});
