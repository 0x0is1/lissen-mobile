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
import TrackPlayer, { Event, State, useTrackPlayerEvents } from "react-native-track-player";
import { decode } from 'html-entities';
import ServiceProvider from '../../libs/APIParser';

const PlayerScreen = () => {
    const {
        albumMode, playList, setPlayingIndex, playingIndex, onShuffle, setOnShuffle
    } = useContext(PlayerContext);

    const serviceProvider = new ServiceProvider();
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [playState, setPlayState] = useState(State.None);

    const playurlOverrider = async (index) => {
        const trackPlayerQueue = await TrackPlayer.getQueue()
        trackPlayerQueue[index].url = await serviceProvider.playByMediaUrl(trackPlayerQueue[index]?.url)
        await TrackPlayer.reset();
        await TrackPlayer.add(trackPlayerQueue);
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
        setPlayingIndex(index);
    };

    const nextActionOverrider = async() => {
        const repeatMode = await TrackPlayer.getRepeatMode();
        if(onShuffle){
            await playurlOverrider(Math.floor(Math.random() * playList.items.length));
        }
        else if (repeatMode!==0){
            await playurlOverrider(playingIndex);
        }
        else {
            await playurlOverrider(playingIndex < playList.items.length - 1 ? playingIndex + 1 : 0)
        }
    }

    const previousActionOverrider = async() => {
        const repeatMode = await TrackPlayer.getRepeatMode();
        if (onShuffle) {
            await playurlOverrider(Math.floor(Math.random() * playList.items.length));
        }
        else if (repeatMode!==0) {
            await playurlOverrider(playingIndex);
        }
        else {
            await playurlOverrider(playingIndex > 0 ? playingIndex - 1 : playList.items.length - 1)
        }
    }

    useEffect(() => {
        const addTracks = async () => {
            await TrackPlayer.reset();
            for (const [index, item] of playList.items.entries()) {
                const reparsedItem = {
                    id: index,
                    url: item.playUrl,
                    title: decode(item.songName),
                    artwork: item.songCover,
                    artist: playList.artistName,
                };
                await TrackPlayer.add(reparsedItem);
            }
            await TrackPlayer.seekTo(0);
            setTotalDuration(1);
            setCurrentDuration(0);
            setPlayingIndex(0);
        };
        addTracks();
    }, [playList]);

    useTrackPlayerEvents([Event.PlaybackState], async (event)=>{
        setPlayState(event.state);
    })

    useTrackPlayerEvents([Event.PlaybackProgressUpdated], async (event) => {
        setTotalDuration(event.duration);
        setCurrentDuration(event.position);
        if(event.duration-event.position<5){
            await nextActionOverrider();
        }

        if ((event.buffered - event.position < 5) && (event.duration - event.position>5)){
            await TrackPlayer.pause();
        }else{
            await TrackPlayer.play();
        }
    })

    // useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    //     if (event.type === Event.PlaybackActiveTrackChanged && event.index === undefined) {
    //         await playurlOverrider(0);
    //         return;
    //     }

    //     if (event.type === Event.PlaybackActiveTrackChanged && event.index !== null && event.index !== playingIndex) {
    //         console.log(`Track changed to index: ${event.index}`);
    //         await playurlOverrider(event.index);
    //     }
    // });

    useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
        const repeatMode = await TrackPlayer.getRepeatMode();

        if (repeatMode === 0) {
            await nextActionOverrider();
        } else {
            await TrackPlayer.seekTo(0);
            await playurlOverrider(playingIndex);
        }
    });

    useTrackPlayerEvents([Event.RemoteNext], async () => {
        await nextActionOverrider();
    });
    
    useTrackPlayerEvents([Event.RemotePrevious], async () => {
        await previousActionOverrider();
    });

    useTrackPlayerEvents([Event.RemotePlay], async () => {
        await playurlOverrider(playingIndex);
    });

    useTrackPlayerEvents([Event.RemoteSeek], async (event) => {
        if (event.position !== undefined) {
            await TrackPlayer.seekTo(event.position);
        }
    });

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
