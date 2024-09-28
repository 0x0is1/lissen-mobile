import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
} from 'react-native-track-player'

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer()

    await TrackPlayer.updateOptions({
        android: {
            appKilledPlaybackBehavior:
                AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            alwaysPauseOnInterruption: true,
        },
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        progressUpdateEventInterval: 1,
    })        
}

export default setupPlayer