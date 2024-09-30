import ServiceProvider from '../libs/APIParser';

const serviceProvider = new ServiceProvider();

const handleAlbum = async ({
    albumData, image_, title_, setPlaylist, navigation
}) => {
    let playData = {};
    const albumType = albumData.type;
    let itemId;
    let data;

    try {
        switch (albumType) {
            case "show":
                console.log(albumData);
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
                data = await serviceProvider.getArtist(itemId, 50);
                playData = {
                    albumName: data.name,
                    artistName: 'Artist',
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


export default handleAlbum