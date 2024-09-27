import { StyleSheet, Text, View, Animated, ImageBackground } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { PlayerContext } from '../../../contexts/PlayerContext'
import { Easing } from 'react-native-reanimated';
import { decode } from 'html-entities';

const PlayerBanner = () => {
    const { albumMode, heightAnim, panResponder } = useContext(PlayerContext)
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
          <ImageBackground
              source={
                  "../../../assets/albumcover.png"
              }
              style={styles.image}
              resizeMode="cover"
          >
              <View style={styles.overlay} />
          </ImageBackground>
          <Text style={styles.text}>
              album/song name
          </Text>
          <Text style={[styles.text, styles.subtext]}>artists name</Text>
      </Animated.View>
  )
}

export default PlayerBanner

const styles = StyleSheet.create({

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
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