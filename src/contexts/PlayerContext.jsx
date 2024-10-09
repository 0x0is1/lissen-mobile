import React, { createContext, useState, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
import ServiceProvider from '../libs/APIParser';
import TrackPlayer, { Event, State, useTrackPlayerEvents } from "react-native-track-player";
import { decode } from 'html-entities';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [albumMode, setAlbumMode] = useState(true);
    const [playingIndex, setPlayingIndex] = useState(0);
    const [onShuffle, setOnShuffle] = useState(false);
    const [playState, setPlayState] = useState(State.None);
    const [likedList, setLikedList] = useState({});
    const [isTrackAddingCompleted, setIsTrackAddingCompleted] = useState(true);
    const serviceProvider = new ServiceProvider();

    const heightAnim = useRef(new Animated.Value(350)).current;
    const progressBarOpacity = useRef(new Animated.Value(0)).current;
    const albumItemsOpacity = useRef(new Animated.Value(1)).current;
    const footerHeightAnim = useRef(new Animated.Value(80)).current;

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 20,
            onPanResponderMove: (evt, gestureState) => {
                setAlbumMode(gestureState.dy <= -20);
            },
        })
    ).current;

    const addTracks = async (_playList, addAtIndex=-1) => {
        setIsTrackAddingCompleted(false);
        for (const [index, item] of _playList.items.entries()) {
            const reparsedItem = {
                id: item.id,
                url: item.playUrl,
                title: decode(item.songName),
                artwork: item.songCover,
                artist: item.artistName || _playList.artistName,
                isLiveStream: true,
                albumName: _playList.albumName,
                duration: item.duration
            };
            if(addAtIndex!==-1){
                await TrackPlayer.add(reparsedItem, addAtIndex);
            } else{
                await TrackPlayer.add(reparsedItem);
            }
            // await TrackPlayer.seekTo(0);
            // setPlayingIndex(0);
        }
        setIsTrackAddingCompleted(true);
    };

    const playurlOverrider = async (index) => {
        const trackPlayerQueue = await TrackPlayer.getQueue()
        if (!trackPlayerQueue[index].url.includes("https://")) {
            trackPlayerQueue[index].url = await serviceProvider.playByMediaUrl(trackPlayerQueue[index]?.url)
        }
        await TrackPlayer.reset();
        await TrackPlayer.add(trackPlayerQueue);
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
        setPlayingIndex(index);
    };

    const nextActionOverrider = async () => {
        const _playList = await TrackPlayer.getQueue()
        const repeatMode = await TrackPlayer.getRepeatMode();
        if (onShuffle) {
            await playurlOverrider(Math.floor(Math.random() * _playList.length));
        }
        else if (repeatMode !== 0) {
            await playurlOverrider(playingIndex);
        }
        else {
            await playurlOverrider(playingIndex < _playList.length - 1 ? playingIndex + 1 : 0)
        }
    }

    const previousActionOverrider = async () => {
        const _playList = await TrackPlayer.getQueue()
        const repeatMode = await TrackPlayer.getRepeatMode();
        if (onShuffle) {
            await playurlOverrider(Math.floor(Math.random() * _playList.length));
        }
        else if (repeatMode !== 0) {
            await playurlOverrider(playingIndex);
        }
        else {
            await playurlOverrider(playingIndex > 0 ? playingIndex - 1 : _playList.length - 1)
        }
    }

    useTrackPlayerEvents([Event.PlaybackState], async (event) => {
        setPlayState(event.state);
    })

    useTrackPlayerEvents([Event.PlaybackProgressUpdated], async (event) => {
        if (event.duration - event.position < 5) {
            await nextActionOverrider();
        }
        const timeLeft = event.duration - event.position;
        const timeBuffered = event.buffered - event.position;

        if ((timeLeft > 5) && (timeBuffered < 5)) {
            await TrackPlayer.pause();
        } else {
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

    return (
        <PlayerContext.Provider value={{
            albumMode,
            heightAnim,
            progressBarOpacity,
            albumItemsOpacity,
            footerHeightAnim,
            panResponder,
            playingIndex,
            onShuffle,
            playState,
            likedList,
            formatTime,
            setOnShuffle,
            playurlOverrider,
            nextActionOverrider,
            previousActionOverrider,
            addTracks,
            setLikedList,
            setAlbumMode,
            isTrackAddingCompleted
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
