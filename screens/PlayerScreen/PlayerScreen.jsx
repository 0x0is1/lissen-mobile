import {
    StyleSheet,
    View,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { PlayerContext } from '../../contexts/PlayerContext';
import PlayerFooter from "./components/PlayerFooter";
import PlayerBanner from "./components/PlayerBanner";
import AlbumItemsContainer from "./components/AlbumItemsContainer";
import ProgressBarContainer from "./components/ProgressBarContainer";
import DurationText from "./components/DurationText";

const PlayerScreen = () => {
    const {
        albumMode,
    } = useContext(PlayerContext);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <PlayerBanner />
            {
                albumMode
                    ? (
                        <AlbumItemsContainer />
                    ) : (
                        <>
                            <ProgressBarContainer />
                            <DurationText />
                        </>
                    )
            }
            <PlayerFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#e7e9eb",
    },
});

export default PlayerScreen;
