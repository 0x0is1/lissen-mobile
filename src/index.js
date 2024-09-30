import registerRootComponent from 'expo/build/launch/registerRootComponent';
import TrackPlayer from 'react-native-track-player'
import { RNTPService } from './utils/RNTPService';
import App from './App';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => RNTPService)