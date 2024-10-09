import { ToastAndroid } from "react-native";

const utilityButtonActions = async (action, props = {}) => {
    const handlePlayAction = async () => {
        if (props.addedToPlaylist) return;
        props.addTracks(props.trackList)
        props.setAddedToPlaylist(true);
        ToastAndroid.show(`${props.trackList.items.length} items added to playlist`, ToastAndroid.SHORT);
        props.navigation.navigate('PlayerScreen');
    }

    const handleLikeAction = async () => {
        ToastAndroid.show('Not implemented yet', ToastAndroid.SHORT);
        Object.keys(props.likedList).includes(props.trackList)    
    }

    const handleDownloadAction = async () => {
        ToastAndroid.show('Not implemented yet', ToastAndroid.SHORT);
    }
    
    const handleEntangleAction = async () => {
        ToastAndroid.show('Not implemented yet', ToastAndroid.SHORT);
    }
    
    const handleShareAction = async () => {
        ToastAndroid.show('Not implemented yet', ToastAndroid.SHORT);
    }

    switch (action) {
        case 'like':
            await handleLikeAction()
            break;
        case 'play':
            await handlePlayAction();
            break;
        case 'download':
            await handleDownloadAction();
            break;
        case 'entanglement':
            await handleEntangleAction();
            break;
        case 'share':
            await handleShareAction();
            break;
        default:
            break;
    }
}

export default utilityButtonActions