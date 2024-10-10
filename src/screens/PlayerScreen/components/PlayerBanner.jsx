import {
	StyleSheet,
	Text,
	View,
	Animated,
	ImageBackground,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { Easing } from "react-native-reanimated";
import { decode } from "html-entities";

const getDecodedText = (text, maxLength) => {
	const decodedText = decode(text || "None");
	return decodedText.length > maxLength
		? `${decodedText.substring(0, maxLength)}...`
		: decodedText;
};

const PlayerBanner = ({ playingIndex, playList }) => {
	const { albumMode, heightAnim, panResponder } = useContext(PlayerContext);

	useEffect(() => {
		Animated.timing(heightAnim, {
			toValue: albumMode ? 350 : 500,
			duration: 400,
			useNativeDriver: false,
			easing: Easing.ease,
		}).start();
	}, [albumMode]);

	const getImageSource = (imagePath) => {
		if (typeof imagePath === "string" && imagePath.startsWith("http")) {
			return { uri: imagePath };
		} else {
			return imagePath;
		}
	};

	return (
		playList && (
			<Animated.View
				style={[styles.imgContainer, { height: heightAnim }]}
				{...panResponder.panHandlers}
			>
				<ImageBackground
					source={
						albumMode
							? getImageSource(
									playList?.items?.[0]?.songCover ||
										require("../../../../assets/splash.png"),
								)
							: getImageSource(
									playList[playingIndex]?.artwork ||
										require("../../../../assets/splash.png"),
								)
					}
					style={styles.image}
					resizeMode="cover"
				>
					<View style={styles.overlay} />
				</ImageBackground>
				<Text style={styles.text}>
					{albumMode
						? "My Queue"
						: getDecodedText(
								playList[playingIndex]?.title || "Unknown Title",
								15,
							)}
				</Text>
				<Text style={[styles.text, styles.subtext]}>
					{!albumMode
						? getDecodedText(
								playList[playingIndex]?.artist ||
									playList?.items?.[playingIndex]?.artistName ||
									"Unknown Artist",
								15,
							)
						: "You"}
				</Text>
			</Animated.View>
		)
	);
};

export default PlayerBanner;

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.35)",
	},
	imgContainer: {
		width: 250,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 150,
		borderBottomRightRadius: 150,
		shadowColor: "#010101",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 1.0,
		shadowRadius: 16.0,
		elevation: 24,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	text: {
		position: "absolute",
		fontSize: 18,
		bottom: 80,
		color: "#fff",
		fontWeight: "500",
	},
	subtext: {
		bottom: 50,
		fontSize: 12,
		fontWeight: "300",
		textTransform: "uppercase",
	},
});
