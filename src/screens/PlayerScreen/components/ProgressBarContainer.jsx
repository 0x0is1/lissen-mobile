import { StyleSheet, Animated, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { PlayerContext } from '../../../contexts/PlayerContext'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import { Easing } from 'react-native-reanimated';

const ProgressBarContainer = ({totalDuration, currentDuration}) => {
    const { albumMode, progressBarOpacity } = useContext(PlayerContext);
    useEffect(() => {
        Animated.timing(progressBarOpacity, {
            toValue: albumMode ? 0 : 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, [albumMode])

    return (
        <Animated.View
            style={[
                styles.progressBarContainer,
                { opacity: progressBarOpacity },
            ]}
        >
            <View style={styles.progressBar}>
                <AnimatedCircularProgress
                    size={340}
                    width={8}
                    fill={totalDuration ? ((currentDuration / totalDuration) * 100) : 0}
                    tintColor="black"
                    backgroundColor="gray"
                    padding={20}
                    arcSweepAngle={180}
                    rotation={-90}
                    lineCap="round"
                    renderCap={({ center }) => (
                        <Circle
                            cx={center.x}
                            cy={center.y}
                            r="10"
                            fill="white"
                            stroke="black"
                            strokeWidth={5}
                        />
                    )}
                />

            </View>
        </Animated.View>
    )
}

export default ProgressBarContainer

const styles = StyleSheet.create({

    progressBarContainer: {
        zIndex: -1,
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100%",
    },
    progressBar: {
        marginTop: -240,
        width: 250,
        height: 100,
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotateX: "180deg" }],
    },

})