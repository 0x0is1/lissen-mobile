import React, { createContext, useState, useRef } from 'react';
import {
    Animated, PanResponder,
 } from 'react-native';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const ALBUMCOVER = require("../assets/albumcover.png");
    const SONGCOVER = require("../assets/songcover.png");

    const [albumMode, setAlbumMode] = useState(true);
    const [playingIndex, setPlayingIndex] = useState(0);
    const [currentDuration, setCurrentDuration] = useState("0:00");
    const [isPlaying, setIsPlaying] = useState(false);
    const [onShuffle, setOnShuffle] = useState(false);
    const [onRepeat, setOnRepeat] = useState(false);
    const [playList, setPlaylist] = useState({
        albumName: "Perception",
        artistName: "NF",
        albumCover: ALBUMCOVER,
        items: [
            { songName: "Intro III", duration: "4:29", songCover: SONGCOVER },
            { songName: "Outcast", duration: "5:26", songCover: SONGCOVER },
            { songName: "10 Feet Down", duration: "3:37", songCover: SONGCOVER },
            { songName: "Green Lights", duration: "3:02", songCover: SONGCOVER },
            { songName: "Dreams", duration: "3:42", songCover: SONGCOVER },
        ],
    });

    const heightAnim = useRef(new Animated.Value(350)).current;
    const progressBarOpacity = useRef(new Animated.Value(0)).current;
    const albumItemsOpacity = useRef(new Animated.Value(1)).current;
    const footerHeightAnim = useRef(new Animated.Value(80)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 20;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy > 20) {
                    setAlbumMode(false);
                } else if (gestureState.dy < -20) {
                    setAlbumMode(true);
                }
            },
        })
    ).current;

    return (
        <PlayerContext.Provider value={{
            albumMode, setAlbumMode,
            playingIndex, setPlayingIndex,
            currentDuration, setCurrentDuration,
            isPlaying, setIsPlaying,
            onShuffle, setOnShuffle,
            onRepeat, setOnRepeat,
            playList, setPlaylist,
            heightAnim,
            progressBarOpacity,
            albumItemsOpacity,
            footerHeightAnim,
            panResponder
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
