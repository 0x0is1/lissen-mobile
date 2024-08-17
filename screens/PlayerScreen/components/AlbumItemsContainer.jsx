import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { PlayerContext } from '../../../contexts/PlayerContext';
import { Easing } from 'react-native-reanimated';

const AlbumItemsContainer = () => {
    const { setPlayingIndex, playingIndex, albumItemsOpacity, albumMode, playList } = useContext(PlayerContext);
    
    useEffect(()=>{
        Animated.timing(albumItemsOpacity, {
            toValue: albumMode ? 1 : 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, [albumMode])

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
      <Animated.View
          style={[styles.albumItemsContainer, { opacity: albumItemsOpacity }]}
      >
          <FlatList
              data={playList.items}
              renderItem={renderAlbumItems}
              keyExtractor={(item, index) => index.toString()}
          />
      </Animated.View>
  )
}

export default AlbumItemsContainer

const styles = StyleSheet.create({
    albumItems: {
        flexDirection: "row",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
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
})