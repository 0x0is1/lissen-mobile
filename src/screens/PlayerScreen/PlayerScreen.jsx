import {
    StyleSheet,
    View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { PlayerContext } from '../../contexts/PlayerContext';
import PlayerFooter from "./components/PlayerFooter";
import PlayerBanner from "./components/PlayerBanner";
import AlbumItemsContainer from "./components/AlbumItemsContainer";
import ProgressBarContainer from "./components/ProgressBarContainer";
import DurationText from "./components/DurationText";
import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const PlayerScreen = () => {
    const {
        albumMode, playList, addTracks, playingIndex, onShuffle, setOnShuffle, playState, playurlOverrider, nextActionOverrider, previousActionOverrider
    } = useContext(PlayerContext);

    const [currentDuration, setCurrentDuration] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useTrackPlayerEvents([Event.PlaybackProgressUpdated], async (event) => {
        setTotalDuration(event.duration);
        setCurrentDuration(event.position);
    });
    
    useEffect(() => {
        addTracks();
    }, [playList]);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <PlayerBanner playingIndex={playingIndex} playList={playList} />
            {
                albumMode
                    ? (
                        <AlbumItemsContainer playList={playList} playurlOverrider={playurlOverrider} />
                    ) : (
                        <>
                            <ProgressBarContainer totalDuration={totalDuration} currentDuration={currentDuration}/>
                            <DurationText currentDuration={currentDuration}/>
                        </>
                    )
            }
            <PlayerFooter playState={playState} onShuffle={onShuffle} setOnShuffle={setOnShuffle} playingIndex={playingIndex} playurlOverrider={playurlOverrider} nextActionOverrider={nextActionOverrider} previousActionOverrider={previousActionOverrider} />
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
