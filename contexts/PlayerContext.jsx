import React, { createContext, useState, useRef, useEffect } from 'react';
import { Animated, PanResponder } from 'react-native';
import { Audio } from 'expo-av';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const ALBUMCOVER = require("../assets/albumcover.png");
    const SONGCOVER = require("../assets/songcover.png");
    const PLAYURLTEST = "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8";
    const [albumMode, setAlbumMode] = useState(true);
    const [playingIndex, setPlayingIndex] = useState(0);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [onShuffle, setOnShuffle] = useState(false);
    const [onRepeat, setOnRepeat] = useState(false);
    const [sound, setSound] = useState(null);

    const [playList, setPlaylist] = useState({
        albumName: "Perception",
        artistName: "NF",
        albumCover: ALBUMCOVER,
        items: [
            { songName: "Intro III", duration: "4:29", songCover: SONGCOVER, playUrl: PLAYURLTEST },
            { songName: "Outcast", duration: "5:26", songCover: SONGCOVER, playUrl: PLAYURLTEST },
            { songName: "10 Feet Down", duration: "3:37", songCover: SONGCOVER, playUrl: PLAYURLTEST },
            { songName: "Green Lights", duration: "3:02", songCover: SONGCOVER, playUrl: PLAYURLTEST },
            { songName: "Dreams", duration: "3:42", songCover: SONGCOVER, playUrl: PLAYURLTEST },
        ],
    });

    const heightAnim = useRef(new Animated.Value(350)).current;
    const progressBarOpacity = useRef(new Animated.Value(0)).current;
    const albumItemsOpacity = useRef(new Animated.Value(1)).current;
    const footerHeightAnim = useRef(new Animated.Value(80)).current;

    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
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

    const getRandomIndex = () => {
        return Math.floor(Math.random() * playList.items.length);
    };

    const playSound = async () => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }
        const playUrl = playList.items[playingIndex].playUrl;
        if (playUrl) {
            console.log('Loading and Playing Sound');
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: playUrl },
                { shouldPlay: true }
            );

            newSound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.isLoaded) {
                    setCurrentDuration(status.positionMillis);

                    if (status.durationMillis !== undefined) {
                        setTotalDuration(status.durationMillis);
                    }

                    if (status.didJustFinish) {
                        if (onRepeat) {
                            await newSound.replayAsync();
                        } else if (onShuffle) {
                            const randomIndex = getRandomIndex();
                            setPlayingIndex(randomIndex);
                            await playSound();
                        } else {
                            const nextIndex = (playingIndex + 1) % playList.items.length;
                            setPlayingIndex(nextIndex);
                            if (nextIndex !== 0) {
                                await playSound();
                            }
                        }
                    }
                }
            });

            setSound(newSound);
            setIsPlaying(true);
        } else {
            console.log('Play URL is not set');
        }
    };

    const pauseSound = async () => {
        if (sound) {
            console.log('Pausing Sound');
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const stopSound = async () => {
        if (sound) {
            console.log('Stopping Sound');
            await sound.stopAsync();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return (
        <PlayerContext.Provider value={{
            albumMode, setAlbumMode,
            playingIndex, setPlayingIndex,
            currentDuration, setCurrentDuration,
            totalDuration,
            isPlaying, setIsPlaying,
            onShuffle, setOnShuffle,
            onRepeat, setOnRepeat,
            playList, setPlaylist,
            heightAnim,
            progressBarOpacity,
            albumItemsOpacity,
            footerHeightAnim,
            panResponder,
            sound,
            playSound,
            pauseSound,
            stopSound,
            formatTime
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
