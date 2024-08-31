import React, { createContext, useState, useRef, useEffect, useCallback } from 'react';
import { Animated, PanResponder } from 'react-native';
import Sound from 'react-native-sound';
import ServiceProvider from '../libs/APIParser';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [albumMode, setAlbumMode] = useState(true);
    const [playingIndex, setPlayingIndex] = useState(0);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [onShuffle, setOnShuffle] = useState(false);
    const [onRepeat, setOnRepeat] = useState(false);
    const [playList, setPlaylist] = useState({ items: [] });

    const soundRef = useRef(null);
    const intervalRef = useRef(null);
    const heightAnim = useRef(new Animated.Value(350)).current;
    const progressBarOpacity = useRef(new Animated.Value(0)).current;
    const albumItemsOpacity = useRef(new Animated.Value(1)).current;
    const footerHeightAnim = useRef(new Animated.Value(80)).current;
    const serviceProvider = new ServiceProvider();
    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 20,
            onPanResponderMove: (evt, gestureState) => {
                setAlbumMode(gestureState.dy <= -20);
            },
        })
    ).current;

    const getRandomIndex = useCallback(() => {
        return Math.floor(Math.random() * (playList.items.length || 0));
    }, [playList.items.length]);

    const updateDuration = useCallback(() => {
        if (soundRef.current) {
            soundRef.current.getCurrentTime(seconds => {
                setCurrentDuration(seconds * 1000);
            });
        }
    }, []);

    const playSound = useCallback(async () => {
        if (soundRef.current) {
            soundRef.current.release();
            soundRef.current = null;
        }

        const playUrl = await serviceProvider.playByMediaUrl(playList.items[playingIndex]?.playUrl);

        if (playUrl) {
            console.log('Loading and Playing Sound');
            const newSound = new Sound(playUrl, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }

                setTotalDuration(newSound.getDuration() * 1000);

                newSound.play((success) => {
                    if (success) {
                        console.log('Finished playing');
                        handlePlaybackFinish();
                    } else {
                        console.log('Playback failed due to audio decoding errors');
                    }
                });

                soundRef.current = newSound;
                setIsPlaying(true);

                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                intervalRef.current = setInterval(updateDuration, 1000);
            });

            newSound.setNumberOfLoops(onRepeat ? -1 : 0);
        } else {
            console.log('Play URL is not set');
        }
    }, [playList.items, playingIndex, onRepeat, updateDuration]);

    const handlePlaybackFinish = useCallback(() => {
        clearInterval(intervalRef.current);

        const nextIndex = onShuffle
            ? getRandomIndex()
            : (playingIndex + 1) % (playList.items.length || 1);

        setPlayingIndex(nextIndex);
    }, [onShuffle, playingIndex, getRandomIndex, playList.items.length]);

    const pauseSound = useCallback(async () => {
        if (soundRef.current && isPlaying) {
            console.log('Pausing Sound');
            soundRef.current.pause();
            setIsPlaying(false);
            clearInterval(intervalRef.current);
        }
    }, [isPlaying]);

    const stopSound = useCallback(async () => {
        if (soundRef.current) {
            console.log('Stopping Sound');
            soundRef.current.stop(() => {
                console.log('Sound stopped');
                setIsPlaying(false);
                clearInterval(intervalRef.current);
            });
        }
    }, []);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.release();
            }
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            playSound();
        }
    }, [playingIndex, isPlaying, playSound]);

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
            playSound,
            pauseSound,
            stopSound,
            formatTime
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
