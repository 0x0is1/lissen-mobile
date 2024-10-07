const PlayerBanner = ({ playingIndex, playList }) => {
    const { albumMode, heightAnim, panResponder } = useContext(PlayerContext);

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: albumMode ? 350 : 500,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();
    }, [albumMode]);

    const getImageSource = (imagePath) => {
        if (typeof imagePath === 'string' && imagePath.startsWith('http')) {
            return { uri: imagePath };
        } else {
            return imagePath;
        }
    };

    return (
        <Animated.View
            style={[styles.imgContainer, { height: heightAnim }]}
            {...panResponder.panHandlers}
        >
            <ImageBackground
                source={
                    albumMode
                        ? getImageSource(playList.albumCover)
                        : getImageSource(playList.items[playingIndex].songCover)
                }
                style={styles.image}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
            </ImageBackground>
            <Text style={styles.text}>
                {albumMode
                    ? decode(playList.albumName.length > 15
                        ? `${playList.albumName.substring(0, 15)}...`
                        : playList.albumName)
                    : decode(playList.items[playingIndex].songName.length > 15
                        ? `${playList.items[playingIndex].songName.substring(0, 15)}...`
                        : playList.items[playingIndex].songName)}
            </Text>
            <Text style={[styles.text, styles.subtext]}>
                {decode((playList.items[playingIndex] || playList.items[0]).artistName.length > 15
                    ? `${(playList.items[playingIndex] || playList.items[0]).artistName.substring(0, 15)}...`
                    : (playList.items[playingIndex] || playList.items[0]).artistName)}
            </Text>
        </Animated.View>
    );
};
