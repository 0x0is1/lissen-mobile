import React, { createContext, useState, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [albumMode, setAlbumMode] = useState(true);
    const [playList, setPlaylist] = useState({ items: [] });
    const [playingIndex, setPlayingIndex] = useState(0);
    const [onShuffle, setOnShuffle] = useState(false);

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

    return (
        <PlayerContext.Provider value={{
            albumMode, setAlbumMode,
            playList, setPlaylist,
            heightAnim,
            progressBarOpacity,
            albumItemsOpacity,
            footerHeightAnim,
            panResponder,
            formatTime,
            playingIndex,
            setPlayingIndex,
            onShuffle,
            setOnShuffle
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
