import {
    Animated,
    Image,
    StyleSheet,
    Text,
    View,
    PanResponder,
    TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";
import { Easing } from "react-native-reanimated";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const PlayerScreen = () => {
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

    const navigation = useNavigation();

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

    const handlePlayPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }
        setIsPlaying(true);
    };

    const handleOnRepeat = () => {
        if (onRepeat) {
            setOnRepeat(false);
            return;
        }
        setOnRepeat(true);
    };

    const handleOnShuffle = () => {
        if (onShuffle) {
            setOnShuffle(false);
            return;
        }
        setOnShuffle(true);
    };

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: albumMode ? 350 : 500,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();

        Animated.timing(progressBarOpacity, {
            toValue: albumMode ? 0 : 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();

        Animated.timing(albumItemsOpacity, {
            toValue: albumMode ? 1 : 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();

        Animated.timing(footerHeightAnim, {
            toValue: albumMode ? 80 : 90,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();
    }, [albumMode]);

    const renderAlbumItems = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                setPlayingIndex(index);
            }}
        >
            <View style={styles.albumItems}>
                <Text
                    style={[
                        styles.songItem,
                        index === playingIndex
                            ? { fontWeight: "800" }
                            : { fontWeight: "500" },
                    ]}
                >
                    {item.songName}
                </Text>
                <Text
                    style={[
                        styles.songItem,
                        index === playingIndex
                            ? { fontWeight: "800" }
                            : { fontWeight: "500" },
                    ]}
                >
                    {item.duration}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.imgContainer, { height: heightAnim }]}
                {...panResponder.panHandlers}
            >
                <Image
                    source={
                        albumMode
                            ? playList.albumCover
                            : playList.items[playingIndex].songCover
                    }
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.text}>
                    {albumMode
                        ? playList.albumName
                        : playList.items[playingIndex].songName}
                </Text>
                <Text style={[styles.text, styles.subtext]}>{playList.artistName}</Text>
            </Animated.View>
            {albumMode ? (
                <>
                    <Animated.View
                        style={[styles.albumItemsContainer, { opacity: albumItemsOpacity }]}
                    >
                        <FlatList
                            data={playList.items}
                            renderItem={renderAlbumItems}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Animated.View>
                </>
            ) : (
                <>
                    <Animated.View
                        style={[
                            styles.progressBarContainer,
                            { opacity: progressBarOpacity },
                        ]}
                    >
                        <View style={styles.progressBar}>
                            <AnimatedCircularProgress
                                size={340}
                                width={8}
                                fill={80}
                                tintColor="black"
                                backgroundColor="gray"
                                padding={20}
                                arcSweepAngle={180}
                                rotation={-90}
                                lineCap="round"
                                renderCap={({ center }) => (
                                    <Circle
                                        cx={center.x}
                                        cy={center.y}
                                        r="10"
                                        fill="white"
                                        stroke="black"
                                        strokeWidth={5}
                                    />
                                )}
                            />
                        </View>
                    </Animated.View>
                    <Text style={styles.durationText}>{currentDuration}</Text>
                </>
            )}
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
                            style={[styles.prevButton, !albumMode && styles.prevNextSongMode]}
                        >
                            <Ionicons name="play-back" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.playPauseButtonContainer}
                            onPress={handlePlayPause}
                        >
                            <Ionicons
                                style={styles.playPauseButton}
                                name={isPlaying ? "pause" : "play"}
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.nextButton, !albumMode && styles.prevNextSongMode]}
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
        </View>
    );
};

const styles = StyleSheet.create({
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
    footer: {
        minWidth: "100%",
        minHeight: 80,
    },
    footercontainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#e7e9eb",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    text: {
        position: "absolute",
        fontSize: 18,
        bottom: 80,
        color: "#fff",
        fontWeight: "500",
    },
    subtext: {
        bottom: 50,
        fontSize: 12,
        fontWeight: "300",
        textTransform: "uppercase",
    },
    imgContainer: {
        width: 250,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        shadowColor: "#010101",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1.0,
        shadowRadius: 16.0,
        elevation: 24,
    },
    progressBarContainer: {
        zIndex: -1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100%",
    },
    progressBar: {
        marginTop: -240,
        width: 250,
        height: 100,
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotateX: "180deg" }],
    },
    albumItems: {
        flexDirection: "row",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 40,
    },
    albumItemsContainer: {
        maxHeight: 300,
        marginTop: 40,
        overflow: "scroll",
    },
    songItem: {
        fontSize: 15,
        fontWeight: "500",
    },
    durationText: {
        position: "relative",
        fontSize: 16,
        color: "black",
        marginTop: 70,
        marginBottom: 100,
    },
});

export default PlayerScreen;
