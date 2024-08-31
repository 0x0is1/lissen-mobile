import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { decode } from 'html-entities';
import ServiceProvider from '../../../libs/APIParser';
import { PlayerContext } from '../../../contexts/PlayerContext';
import { useNavigation } from '@react-navigation/native';

const Card = ({ albumData, index }) => {
    const { setPlayingIndex, setPlaylist, playList, playSound, stopSound } = useContext(PlayerContext);
    const navigation = useNavigation();
    const serviceProvider = new ServiceProvider();
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleAlbum = async ({
        image_, title_
    }) => {
        let playData = {};
        const albumType = albumData.type;
        let itemId;
        let data;

        try {
            switch (albumType) {
                case "show":
                    console.log(itemId);
                    break;
                case "album":
                    itemId = albumData.perma_url.split("/").slice(-1);
                    data = await serviceProvider.getAlbumById(itemId);
                    playData = {
                        albumName: data.title,
                        artistName: data.subtitle,
                        albumCover: data.image.replace("150x150", "500x500"),
                        items: data.list.map((item, i) => {
                            return {
                                songName: item.title,
                                duration: item.more_info.duration,
                                songCover: item.image.replace("150x150", "500x500"),
                                playUrl: item.more_info.encrypted_media_url,
                            };
                        }),
                    };
                    break;
                case "radio_station":
                    itemId = albumData.id;
                    data = await serviceProvider.getStationById(itemId);
                    delete data["stationid"];
                    playData = {
                        albumName: title_,
                        artistName: 'Various Artists',
                        albumCover: image_.replace("150x150", "500x500"),
                        items: Object.keys(data).map((key, i) => {
                            const item = data[key].song;
                            return {
                                songName: item.title,
                                duration: item.more_info.duration,
                                songCover: item.image.replace("150x150", "500x500"),
                                playUrl: item.more_info.encrypted_media_url,
                            };
                        }),
                    };
                    console.log(playData)
                    break;
                case "song":
                    itemId = albumData.id;
                    data = await serviceProvider.getSongById(itemId);                    
                    playData = {
                        albumName: data.song,
                        artistName: data.primary_artists,
                        albumCover: data.image.replace("150x150", "500x500"),
                        items: [
                            {
                                songName: data.song,
                                duration: data.duration,
                                songCover: data.image.replace("150x150", "500x500"),
                                playUrl: data.encrypted_media_url,
                            }
                        ]
                    };
                    break;
                case "playlist":
                    itemId = albumData.id;
                    data = await serviceProvider.getPlaylistById(itemId);
                    playData = {
                        albumName: data.listname,
                        artistName: data.firstname,
                        albumCover: data.image.replace("150x150", "500x500"),
                        items: data.songs.map((item, i) => {
                            return {
                                songName: item.song,
                                duration: item.duration,
                                songCover: item.image.replace("150x150", "500x500"),
                                playUrl: item.encrypted_media_url,
                            };
                        }),
                    };
                    break;
                case "artist":
                    itemId = albumData.artistid || albumData.id;
                    data = await serviceProvider.getArtist(itemId);
                    playData = {
                        albumName: data.name,
                        artistName: '-',
                        albumCover: data.image.replace("150x150", "500x500"),
                        items: data.topSongs.map((item, i) => {
                            return {
                                songName: item.album,
                                duration: item.duration,
                                songCover: item.image.replace("150x150", "500x500"),
                                playUrl: item.encrypted_media_url,
                            };
                        }),
                    };
                    break;
                default:
                    break;
            }

            if (playData.items && playData.items.length > 0) {
                setPlaylist(playData);
                navigation.navigate('PlayerScreen');
            }
        } catch (error) {
            console.error('Error handling album:', error);
        }
    };

    return (
        <TouchableOpacity onPress={() => handleAlbum({
            image_: albumData.image,
            title_: albumData.title
        })} style={[styles.card, { height: index % 3 === 0 ? 250 : 180 }]}>
            <ImageBackground
                source={{ uri: albumData.image.replace("150x150", "500x500") }}
                style={styles.image}
                imageStyle={styles.imageOverlay}
            >
                <View style={styles.overlay} />
                <Text style={styles.title}>{decode(albumData.title.length > 10
                    ? `${albumData.title.substring(0, 15)}...`
                    : albumData.title)}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        maxWidth: 180,
        minWidth: 180,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        overflow: "hidden",
        marginHorizontal: 15,
        marginVertical: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden"
    },
    imageOverlay: {
        borderRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        borderRadius: 8,
    },
    title: {
        position: "absolute",
        bottom: 10,
        left: 10,
        fontSize: 20,
        fontWeight: "800",
        color: "#fff",
    },
});
