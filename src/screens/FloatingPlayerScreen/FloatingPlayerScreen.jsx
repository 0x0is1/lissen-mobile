import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrackPlayer, {
	Event,
	State,
	useTrackPlayerEvents,
} from "react-native-track-player";
import { PlayerContext } from "../../contexts/PlayerContext";
import { decode } from "html-entities";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import CSlider from "./components/CSlider";

const FloatingPlayerScreen = ({ playerInitialized }) => {
	if (!playerInitialized) return; 
	const {
		playState,
		playingIndex,
		albumMode,
		playurlOverrider,
		nextActionOverrider,
		isTrackAddingCompleted,
	} = useContext(PlayerContext);
	const [currentDuration, setCurrentDuration] = useState(0);
	const [totalDuration, setTotalDuration] = useState(0);
	const [queue, setQueue] = useState(null);
	const navigator = useNavigation();
	const [shouldDisplay, setShouldDisplay] = useState(true);

	const state = useNavigationState((state) => state);

	useEffect(() => {
		if (!state) return;

		var currentRoute = state.routes[state.index];

		if (state.routes.length > 0) {
			if (currentRoute?.name === "DashboardScreen") {
				currentRoute = currentRoute?.state?.routes[currentRoute?.state?.index];
			}
			if (
				currentRoute?.name === "PlayerScreen" ||
				(currentRoute?.name === "AlbumViewerScreen" && !albumMode)
			) {
				setShouldDisplay(false);
			} else {
				setShouldDisplay(true);
			}
		} else {
			setShouldDisplay(currentRoute?.name !== "PlayerScreen");
		}
	}, [state, albumMode]);

	const getDecodedText = (text, maxLength) => {
		const decodedText = decode(text || "None");
		return decodedText.length > maxLength
			? `${decodedText.substring(0, maxLength)}...`
			: decodedText;
	};
 
	const getImageSource = (imagePath) => {
		if (typeof imagePath === "string" && imagePath.startsWith("http")) {
			return { uri: imagePath };
		} else {
			return imagePath;
		}
	};

	useTrackPlayerEvents([Event.PlaybackProgressUpdated], (event) => {
		setTotalDuration(event.duration);
		setCurrentDuration(event.position);
	});

	useEffect(() => {
		if (isTrackAddingCompleted) {
			const fetchQueue = async () => {
				const queueres = await TrackPlayer.getQueue();
				setQueue(queueres);
			};
			fetchQueue();
		}
	}, [isTrackAddingCompleted]);

	const handlePlayPause = async () => {
		if (playState === State.Playing) {
			await TrackPlayer.pause();
		} else if (playState === State.Paused) {
			await TrackPlayer.play();
		} else if (
			playState === State.Error ||
			playState === State.Ready ||
			playState === State.None
		) {
			await playurlOverrider(playingIndex);
		}
	};

	const handleOnNext = async () => {
		await nextActionOverrider();
	};

	  
	return (
		isTrackAddingCompleted &&
		queue &&
		queue[playingIndex] &&
		shouldDisplay && (
			<TouchableOpacity activeOpacity={1}
				style={styles.container}
				onPress={() => navigator.navigate("PlayerScreen")}
			>
				<View style={styles.playerContent}>
					<Image
						style={styles.albumArt}
						source={getImageSource(
							queue[playingIndex]?.artwork ||
								require("../../../assets/splash.png"),
						)}
					/>

					<View style={styles.textWrapper}>
						<Text style={styles.songTitle}>
							{getDecodedText(
								queue[playingIndex]?.title || "Unknown Title",
								16,
							)}
						</Text>
						<Text style={styles.artistName}>
							{getDecodedText(
								queue[playingIndex]?.artist ||
									queue?.items?.[playingIndex]?.artistName ||
									"Unknown Artist",
								16,
							)}
						</Text>
					</View>

					<View style={styles.controls}>
						<TouchableOpacity activeOpacity={1}
							style={styles.playPauseButtonContainer}
							onPress={handlePlayPause}
						>
							<Ionicons
								style={styles.playPauseButton}
								name={
									playState === State.Paused ||
									playState === State.None ||
									playState === State.Error
										? "play"
										: playState === State.Buffering ||
												playState === State.Loading
											? "reload"
											: "pause"
								}
								size={30}
								color="white"
							/>
						</TouchableOpacity>

						<TouchableOpacity activeOpacity={1}
							style={[styles.nextButton]}
							onPress={handleOnNext}
						>
							<Ionicons name="play-forward" size={30} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>

				<CSlider
					totalDuration={totalDuration}
					currentDuration={currentDuration}
				/>
			</TouchableOpacity>
		)
	);
};

export default FloatingPlayerScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "absolute",
		bottom: 5,
		width: "94%",
		marginHorizontal: "3%",
		borderRadius: 10,
		backgroundColor: "#000",
		paddingHorizontal: 8,
		paddingTop: 4,
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		overflow: "hidden",
	},
	nextButton: {
		paddingLeft: 15,
		marginLeft: -5,
		paddingRight: 10,
		borderBottomRightRadius: 25,
		borderTopRightRadius: 25,
		paddingVertical: 8,
	},
	prevNextSongMode: {
		backgroundColor: "#f5f5f4",
		shadowColor: "#010101",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 1.0,
		shadowRadius: 16.0,
		elevation: 24,
		zIndex: -2,
	},
	controls: {
		flexDirection: "row",
	},
	playerContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	albumArt: {
		width: 40,
		height: 40,
		borderRadius: 8,
		marginRight: 12,
	},
	textWrapper: {
		flex: 1,
		justifyContent: "center",
	},
	songTitle: {
		fontSize: 16,
		color: "#FFFFFF",
		fontFamily: "Poppins-Bold"
	},
	artistName: {
		fontSize: 14,
		color: "#B0B0B0",
		fontFamily: "Poppins-Regular"
	},
	playPauseButtonContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
});
