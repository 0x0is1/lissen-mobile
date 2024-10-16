import * as Font from 'expo-font';

const loadFonts = async () => {
    await Font.loadAsync({
        'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-Thin': require("../../assets/fonts/Poppins/Poppins-Thin.ttf")
    });
};


export default loadFonts