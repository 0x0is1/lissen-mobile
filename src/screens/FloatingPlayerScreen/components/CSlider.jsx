import { StyleSheet } from "react-native";
import React from "react";
import TrackPlayer from "react-native-track-player";
import Slider from "@react-native-community/slider";

const CSlider = ({ totalDuration, currentDuration }) => {
	const handleSliderValueChange = async (value) => {
		await TrackPlayer.seekTo(value * totalDuration);
	};
	return (
		<Slider
			style={styles.slider}
			minimumValue={0}
			maximumValue={1}
			value={totalDuration > 0 ? currentDuration / totalDuration : 0}
			onSlidingComplete={handleSliderValueChange}
			minimumTrackTintColor="#FFFFFF"
			maximumTrackTintColor="#FFFFFF"
			thumbTintColor="#FFFFFF"
			thumbImage={null}
		/>
	);
};

export default CSlider;

const styles = StyleSheet.create({
	slider: {
		flex: 1,
		alignSelf: "stretch",
		marginHorizontal: -10,
		height: 15,
	},
});
