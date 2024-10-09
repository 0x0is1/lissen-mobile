import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
const CustomStatusBar = () => {
    const navigator = useNavigation();
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => { navigator.goBack() }} style={[styles.icons, {right: 140}]}>
                <Ionicons name='chevron-back' size={25} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { ToastAndroid.show('Not implemented yet', ToastAndroid.SHORT) }} style={[styles.icons, { left: 140 }]}>
                <Ionicons name='information' size={25} color={'#000'} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomStatusBar

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 25
    },
    icons: {
        borderRadius: 40,
    }
})