import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { expo } from "../../../../app.json";
import * as Font from 'expo-font';

const loadFonts = async () => {
    try {
        await Font.loadAsync({
            'MonkeyBold': require('../../../../assets/fonts/MonkyBold.otf'),
        });
    } catch (error) {
        console.error('Error loading font:', error);
    }
};


const CenterHeader = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.title}>
            <Image source={require('../../../../assets/icon.png')} style={styles.icon} />
            <Text style={[styles.text, { fontFamily: 'MonkeyBold' }]}>{expo.displayName}</Text>
        </View>
    );
};

export default CenterHeader;

const styles = StyleSheet.create({
    title: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: "100%",
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    text: {
        fontWeight: '800',
        fontSize: 18,
        textTransform: 'capitalize'
    },
});
