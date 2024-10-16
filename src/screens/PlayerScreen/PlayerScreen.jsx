import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import PlayerFooter from "./components/PlayerFooter";
import PlayerBanner from "./components/PlayerBanner";
import AlbumItemsContainer from "./components/AlbumItemsContainer";
import ProgressBarContainer from "./components/ProgressBarContainer";
import DurationText from "./components/DurationText";
import TrackPlayer, {
	Event,
	State,
	useTrackPlayerEvents,
} from "react-native-track-player";
import CustomStatusBar from "./components/CustomStatusBar";
import { colors } from "../../constants/colors";

const PlayerScreen = () => {
	const {
		albumMode,
		playingIndex,
		onShuffle,
		setOnShuffle,
		playState,
		playurlOverrider,
		nextActionOverrider,
		previousActionOverrider,
		isTrackAddingCompleted,
	} = useContext(PlayerContext);
	const [currentDuration, setCurrentDuration] = useState(0);
	const [totalDuration, setTotalDuration] = useState(0);
	const [queue, setQueue] = useState(null);

	useTrackPlayerEvents([Event.PlaybackProgressUpdated], async (event) => {
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

	return (
		isTrackAddingCompleted && (
			<View style={styles.container}>
				<CustomStatusBar />
				<PlayerBanner playingIndex={playingIndex} playList={queue} />
				{albumMode ? (
					<AlbumItemsContainer
						playList={queue}
						playurlOverrider={playurlOverrider}
					/>
				) : (
					<>
						<ProgressBarContainer
							totalDuration={totalDuration}
							currentDuration={currentDuration}
						/>
						<DurationText currentDuration={currentDuration} />
					</>
				)}
				<PlayerFooter
					playState={playState}
					onShuffle={onShuffle}
					setOnShuffle={setOnShuffle}
					playingIndex={playingIndex}
					playurlOverrider={playurlOverrider}
					nextActionOverrider={nextActionOverrider}
					previousActionOverrider={previousActionOverrider}
				/>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.primaryBackgroundColor,
	},
});

export default PlayerScreen;
