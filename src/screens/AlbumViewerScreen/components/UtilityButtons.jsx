import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Octicons from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import utilityButtonActions from "../../../utils/utilityButtonActions";
import { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants/colors";

const UtilityButtons = ({ trackList }) => {
	const [addedToPlaylist, setAddedToPlaylist] = useState(false);
	const { activePlaylistId, addTracks, likedList } = useContext(PlayerContext);
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => utilityButtonActions("like", { trackList, likedList })}
				accessibilityLabel="Like"
			>
				<Ionicon name="heart" size={25} style={styles.icon} color={"red"} />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() =>
					utilityButtonActions("play", {
						trackList,
						activePlaylistId,
						addTracks,
						setAddedToPlaylist,
						addedToPlaylist,
						navigation,
					})
				}
				style={[styles.button, { backgroundColor: colors.albumPlayButtonBg, borderWidth: 0 }]}
				accessibilityLabel="Play"
			>
				<Octicons
					name={addedToPlaylist ? "playlist-add-check" : "playlist-add"}
					size={25}
					style={styles.icon}
					color={colors.secondaryColor}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				accessibilityLabel="Download"
				onPress={() =>
					utilityButtonActions("download", { trackList: trackList })
				}
			>
				<Octicons name="download" size={25} style={styles.icon} />
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				accessibilityLabel="Listen with people"
				onPress={() =>
					utilityButtonActions("entanglement", { trackList: trackList })
				}
			>
				<Ionicon name="people" size={25} style={styles.icon} />
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				accessibilityLabel="Share"
				onPress={() => utilityButtonActions("share", { trackList: trackList })}
			>
				<Octicons name="share" size={25} style={styles.icon} />
			</TouchableOpacity>
		</View>
	);
};

export default UtilityButtons;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginTop: 20,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		marginHorizontal: 5,
		padding: 10,
		borderWidth: 1,
		borderColor: colors.borderPrimary,
		borderRadius: 50,
		backgroundColor: colors.navbarBg,
	},
	icon: {
		textAlign: "center",
	},
});
