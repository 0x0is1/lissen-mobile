import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { decode } from 'html-entities';
import ServiceProvider from '../../../libs/APIParser';

const Card = ({ albumData, index }) => {
    const serviceProvider = new ServiceProvider();
    const handleAlbum = async () => {
        const albumType = albumData.type;
        let itemId;
        let data;
        switch (albumType) {
            case "show":
                console.log(itemId);
                break;
            case "album":
                itemId = albumData.perma_url.split("/").slice(-1);
                data = await serviceProvider.getAlbumById(itemId);
                break;
            case "radio_station":
                itemId = albumData.id;
                data = await serviceProvider.getStationById(itemId);
                break;
            case "song":
                itemId = albumData.id;
                data = await serviceProvider.getSongById(itemId);
                break;
            case "playlist":
                itemId = albumData.id;
                data = await serviceProvider.getPlaylistById(itemId);
                break;
            case "artist":
                itemId = albumData.artistid | albumData.id;
                data = await serviceProvider.getArtist(itemId);
                break;

            default:
                break;
        }
    }
    return (
        <TouchableOpacity onPress={handleAlbum} style={[styles.card, { height: index % 3 === 0 ? 250 : 180 }]}>
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
    )
}

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
