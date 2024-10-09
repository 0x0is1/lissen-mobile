import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { PlayerContext } from '../../../contexts/PlayerContext';
import { Easing } from 'react-native-reanimated';
import { decode } from 'html-entities';

const AlbumItemsContainer = ({ playList, playurlOverrider }) => {
    const { formatTime, albumItemsOpacity, albumMode, playingIndex } = useContext(PlayerContext);

    useEffect(() => {
        Animated.timing(albumItemsOpacity, {
            toValue: albumMode ? 1 : 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, [albumMode]);

    const onItemPlayPressed = async (index) => {        
        await playurlOverrider(index);
    };

    const renderAlbumItems = ({ item, index }) => (
        <TouchableOpacity onPress={() => onItemPlayPressed(index)}>
            <View style={styles.albumItems}>
                <Text
                    style={[
                        styles.songItem,
                        item.id === (playList[playingIndex]?.id || undefined) ? { fontWeight: '800' } : { fontWeight: '500' },
                    ]}
                >
                    {decode(item.title).length > 30
                        ? `${decode(item.title).substring(0, 30)}...`
                        : decode(item.title)}
                </Text>
                <Text
                    style={[
                        styles.songItem,
                        item.id === (playList[playingIndex]?.id || undefined) ? { fontWeight: '800' } : { fontWeight: '500' },
                    ]}
                >
                    {formatTime(item.duration)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        playList && playList.length > 0 ?
        <Animated.View style={[styles.albumItemsContainer, { opacity: albumItemsOpacity }]}>
            <FlatList
                data={playList}
                renderItem={renderAlbumItems}
                keyExtractor={(item, index) => index.toString()}
            />
        </Animated.View>
        :
        <Animated.View style={[styles.albumItemsContainer, { opacity: albumItemsOpacity }]}>
            <Text style={styles.placeholder}>No items to display</Text>
        </Animated.View>
    );
};

export default AlbumItemsContainer;

const styles = StyleSheet.create({
    placeholder: {
        height: 300
    },
    
    albumItems: {
        flexDirection: 'row',
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 40,
    },
    albumItemsContainer: {
        maxHeight: 300,
        marginTop: 40,
        overflow: 'scroll',
    },
    songItem: {
        fontSize: 15,
        fontWeight: '500',
    },
});
