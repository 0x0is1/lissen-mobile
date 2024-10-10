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

const Card = ({ albumData, index }) => {
	const navigation = useNavigation();
	albumData.title = albumData.title ? albumData.title : albumData.name;
	return (
		<TouchableOpacity
			onPress={() =>
				handleAlbum({
					albumData: albumData,
					image_: albumData.image,
					title_: albumData.title,
					navigation: navigation,
				})
			}
			style={[styles.card, { height: index % 3 === 0 ? 250 : 180 }]}
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
						albumData.title.length > 15
							? `${albumData.title.substring(0, 15)}...`
							: albumData.title,
					)}
				</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	card: {
		maxWidth: 180,
		minWidth: 165,
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		elevation: 5,
		overflow: "hidden",
		marginHorizontal: 8,
		marginVertical: 10,
	},
	image: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
		position: "relative",
		overflow: "hidden",
	},
	imageOverlay: {
		borderRadius: 8,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.35)",
		borderRadius: 8,
	},
	title: {
		position: "absolute",
		bottom: 10,
		left: 10,
		fontSize: 20,
		fontWeight: "800",
		color: "#fff",
	},
});
