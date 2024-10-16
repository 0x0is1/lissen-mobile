import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { expo } from "../../../../app.json";
import Ionicons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../constants/colors";

const Footer = (props) => {
	const [remoteVersion, setRemoteVersion] = useState(null);

	useEffect(() => {
		const versionFetch = async () => {
			const resp = await fetch(
				"https://raw.githubusercontent.com/0x0is1/lissen-mobile/refs/heads/main/app.json",
			);
			const data = await resp.json();
			setRemoteVersion(data.expo.version);
		};
		versionFetch();
	}, []);

	const insets = useSafeAreaInsets();
	const isUpdateAvailable = remoteVersion && expo.version < remoteVersion;

	return (
		<View style={{ flex: 1, marginTop: 40 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{ paddingTop: 0 }}
			>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<View
				style={[styles.footerContainer, { paddingBottom: insets.bottom + 10 }]}
			>
				<View>
					<Text style={styles.footerText}>Current Version: {expo.version}</Text>
					<Text style={styles.footerText}>
						Latest Version: {remoteVersion || "NaN"}
					</Text>
				</View>
				<TouchableOpacity activeOpacity={1}
					onPress={() => props.navigation.navigate("VersionScreen")}
					disabled={!isUpdateAvailable}
				>
					<Ionicons
						name="security-update"
						size={25}
						color={!isUpdateAvailable ? colors.borderPrimary : colors.primaryColor}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	footerContainer: {
		borderTopWidth: 1,
		borderTopColor: colors.borderSecondary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: colors.secondaryBackgroundColor,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	footerText: {
		fontSize: 14,
		color: colors.tertiaryColor,
		textAlign: "center",
	},
});
