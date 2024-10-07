import {
    StyleSheet,
    View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PlayerContext } from '../../contexts/PlayerContext';
import PlayerFooter from "./components/PlayerFooter";
import PlayerBanner from "./components/PlayerBanner";
import AlbumItemsContainer from "./components/AlbumItemsContainer";
import ProgressBarContainer from "./components/ProgressBarContainer";
import DurationText from "./components/DurationText";
import { Event, useTrackPlayerEvents } from 'react-native-track-player'
import UtilityButtons from "./components/UtilityButtons";

const AlbumViewerScreen = () => {
    const {
        albumMode, addTracks, activePlaylistId, playList, playingIndex, onShuffle, setOnShuffle, playState, playurlOverrider, nextActionOverrider, previousActionOverrider
    } = useContext(PlayerContext);
    const route = useRoute()
    const _playList = playList[activePlaylistId];
    const trackList = route.params.data
    const [currentDuration, setCurrentDuration] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useTrackPlayerEvents([Event.PlaybackProgressUpdated], async (event) => {
        setTotalDuration(event.duration);
        setCurrentDuration(event.position);
    });
    
    // useEffect(() => {
    //     addTracks();
    // }, [playList]);

    // const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {
                albumMode
                ? (
                    <>
                            <PlayerBanner playingIndex={playingIndex} playList={trackList} />
                            <UtilityButtons trackList={trackList} />
                            <AlbumItemsContainer trackList={trackList} playurlOverrider={playurlOverrider} />
                        </>
                    ) : (
                        <>
                            <PlayerBanner playingIndex={playingIndex} playList={_playList} />
                            <ProgressBarContainer totalDuration={totalDuration} currentDuration={currentDuration}/>
                            <DurationText currentDuration={currentDuration}/>
                            <PlayerFooter playState={playState} onShuffle={onShuffle} setOnShuffle={setOnShuffle} playingIndex={playingIndex} playurlOverrider={playurlOverrider} nextActionOverrider={nextActionOverrider} previousActionOverrider={previousActionOverrider} />
                        </>
                    )
            }
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

export default AlbumViewerScreen;
