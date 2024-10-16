import * as Updates from "expo-updates";
import { ToastAndroid } from "react-native";

const autoUpdateFetch = async () => {
	try {
		const update = await Updates.checkForUpdateAsync();
		if (update.isAvailable) {
			await Updates.fetchUpdateAsync();
			await Updates.reloadAsync();
		}
	} catch (error) {
		ToastAndroid.show(
			`Error fetching latest Expo update: ${error}`,
			ToastAndroid.SHORT,
		);
	}
};

export default autoUpdateFetch;
