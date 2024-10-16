import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { Easing } from "react-native-reanimated";
import { decode } from "html-entities";
import { fonts } from "../../../constants/fonts";

const AlbumItemsContainer = ({ trackList, playurlOverrider, queue }) => {
	const { formatTime, albumItemsOpacity, albumMode, playingIndex, addTracks } =
		useContext(PlayerContext);
	useEffect(() => {
		Animated.timing(albumItemsOpacity, {
			toValue: albumMode ? 1 : 0,
			duration: 400,
			useNativeDriver: true,
			easing: Easing.ease,
		}).start();
	}, [albumMode]);

	const onItemPlayPressed = async (index) => {
		const _trackList = {
			...trackList,
			items: [trackList.items[index]],
		};
		addTracks(_trackList, playingIndex);
		await playurlOverrider(playingIndex);
	};

	const renderAlbumItems = ({ item, index }) => (
		<TouchableOpacity activeOpacity={1} onPress={() => onItemPlayPressed(index)}>
			<View style={styles.albumItems}>
				<Text
					style={[
						styles.songItem,
						item.id === (queue[playingIndex]?.id || undefined)
							? { fontFamily: fonts.poppinsSecondary }
							: { fontFamily: fonts.poppinsPrimary },
					]}
				>
					{decode(item.songName).length > 30
						? `${decode(item.songName).substring(0, 30)}...`
						: decode(item.songName)}
				</Text>
				<Text
					style={[
						styles.songItem,
						item.id === (queue[playingIndex]?.id || undefined)
							? { fontFamily: fonts.poppinsSecondary }
							: { fontFamily: fonts.poppinsPrimary },
					]}
				>
					{formatTime(item.duration)}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<Animated.View
			style={[styles.albumItemsContainer, { opacity: albumItemsOpacity }]}
		>
			<FlatList
				data={trackList.items}
				renderItem={renderAlbumItems}
				keyExtractor={(item, index) => index.toString()}
			/>
		</Animated.View>
	);
};

export default AlbumItemsContainer;

const styles = StyleSheet.create({
	albumItems: {
		flexDirection: "row",
		minWidth: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 8,
		paddingHorizontal: 40,
	},
	albumItemsContainer: {
		maxHeight: 390,
		marginTop: 10,
		overflow: "scroll",
	},
	songItem: {
		fontSize: 15,
		fontFamily: fonts.poppinsPrimary
	},
});
