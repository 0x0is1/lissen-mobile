import { StyleSheet, Text, Image, Animated } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { PlayerContext } from '../../../contexts/PlayerContext'
import { Easing } from 'react-native-reanimated';

const PlayerBanner = () => {
    const { albumMode, heightAnim, panResponder, playList, playingIndex } = useContext(PlayerContext)
    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: albumMode ? 350 : 500,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();
    }, [albumMode])
    
  return (
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
  )
}

export default PlayerBanner

const styles = StyleSheet.create({
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
})