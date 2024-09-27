import { StyleSheet, Text } from 'react-native'
import React, { useContext } from 'react'
import { PlayerContext } from '../../../contexts/PlayerContext';

const DurationText = () => {
    const { formatTime } = useContext(PlayerContext);
    const currentDuration = 200
    return (
        <Text style={styles.durationText}>{formatTime(currentDuration)}</Text>
    )
}

export default DurationText

const styles = StyleSheet.create({
    durationText: {
        position: "relative",
        fontSize: 16,
        color: "black",
        marginTop: 70,
        marginBottom: 100,
    },
})