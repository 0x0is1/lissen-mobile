import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext';
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Easing } from 'react-native-reanimated';
import TrackPlayer, { RepeatMode, State } from 'react-native-track-player';

const PlayerFooter = ({ playState, onShuffle, setOnShuffle, playurlOverrider, playingIndex, nextActionOverrider, previousActionOverrider }) => {
    const [onRepeat, setOnRepeat] = useState(false)
    useEffect(()=>{
        const fetchRepeat = async () => {
            const repeatMode = await TrackPlayer.getRepeatMode();
            if(repeatMode !== RepeatMode.Off){
                setOnRepeat(true);
            }
            else{
                setOnRepeat(false);
            }
        }
        fetchRepeat();
    }, [])
    const {
        footerHeightAnim, albumMode,
    } = useContext(PlayerContext);

    useEffect(() => {
        Animated.timing(footerHeightAnim, {
            toValue: albumMode ? 80 : 90,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();
    }, [albumMode]);


    const handleOnRepeat = async () => {
        if(onRepeat){
            await TrackPlayer.setRepeatMode(RepeatMode.Off)
            setOnRepeat(false);
        }
        else {
            await TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setOnRepeat(true);
        }
    };

    const handlePlayPause = async () => {        
        if(playState===State.Playing){
            await TrackPlayer.pause();
        }
        else if(playState===State.Paused) {
            await TrackPlayer.play();
        }
        else if (playState===State.Error || playState===State.Ready || playState === State.None){
            await playurlOverrider(playingIndex);
        }
    };

    const handleOnShuffle = () => {
        setOnShuffle(!onShuffle);
    };

    const handleOnNext = async () => {
        await nextActionOverrider();
    };

    const handleOnPrevious = async () => {
        await previousActionOverrider();
    };

    return (
        <Animated.View style={[styles.footer, { height: footerHeightAnim }]}>
            <View style={styles.footercontainer}>
                <TouchableOpacity
                    onPress={handleOnRepeat}
                    style={[
                        styles.shuffleRepeatButtons,
                        onRepeat && styles.prevNextSongMode,
                    ]}
                >
                    <Feather name="repeat" size={25} color="black" />
                </TouchableOpacity>
                <View style={styles.playPauseControl}>
                    <TouchableOpacity
                        style={[
                            styles.prevButton,
                            !albumMode && styles.prevNextSongMode
                        ]}
                        onPress={handleOnPrevious}
                    >
                        <Ionicons name="play-back" size={25} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.playPauseButtonContainer}
                        onPress={handlePlayPause}
                    >
                        <Ionicons
                            style={styles.playPauseButton}
                            name={playState===State.Paused || playState===State.None || playState===State.Error ? "play" : playState===State.Buffering || playState===State.Loading ? "reload" : "pause"}
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            !albumMode && styles.prevNextSongMode
                        ]}
                        onPress={handleOnNext}
                    >
                        <Ionicons name="play-forward" size={25} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={handleOnShuffle}
                    style={[
                        styles.shuffleRepeatButtons,
                        onShuffle && styles.prevNextSongMode,
                    ]}
                >
                    <Feather name="shuffle" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default PlayerFooter;

const styles = StyleSheet.create({
    footer: {
        minWidth: "100%",
    },

    footercontainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 15,
    },

    shuffleRepeatButtons: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 50,
    },

    prevNextSongMode: {
        backgroundColor: "#f5f5f4",
        shadowColor: "#010101",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1.0,
        shadowRadius: 16.0,
        elevation: 24,
        zIndex: -2,
    },

    prevButton: {
        paddingRight: 15,
        marginRight: -5,
        paddingLeft: 10,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        paddingVertical: 8,
    },

    nextButton: {
        paddingLeft: 15,
        marginLeft: -5,
        paddingRight: 10,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        paddingVertical: 8,
    },

    playPauseControl: {
        flexDirection: "row",
        alignItems: "center",
    },

    playPauseButtonContainer: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },

    playPauseButton: {
        height: 30,
        width: 30,
    },
});
