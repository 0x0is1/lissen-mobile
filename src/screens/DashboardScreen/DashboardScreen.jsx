import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchScreen from "../../screens/SearchScreen/SearchScreen";
import AlbumsScreen from "../../screens/AlbumsScreen/AlbumsScreen";
import RightHeaderButton from "./components/RightHeaderButton";
import CenterHeader from "./components/CenterHeader";
import VersionScreen from "../VersionScreen/VersionScreen";
import AboutScreen from "../AboutScreen/AboutScreen";
import DownloadsScreen from "../DownloadsScreen/DownloadsScreen";
import SettingsScreen from "../SettingsScreen/SettingsScreen";
import LibraryScreen from "../LibraryScreen/LibraryScreen";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Footer from "./components/Footer";
import PlayerScreen from "../PlayerScreen/PlayerScreen";
import Constants from "../../constants/constants";

const Drawer = createDrawerNavigator();
const constants = new Constants();

const DashboardScreen = ({ navigation }) => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerTitle: CenterHeader,
				headerRight: ({color}) => RightHeaderButton({ navigation, color }),
				drawerActiveTintColor: "#1f1e1e",
				drawerInactiveTintColor: "#333131",
				drawerStyle: {
					backgroundColor: "#f5f5f5",
					width: 280,
				},
				drawerLabelStyle: {
					fontFamily: "Poppins-Regular",
					fontSize: 16,
				},
				drawerAllowFontScaling: true,
				headerTitleAlign: "left",
			}}
			drawerContent={(props) => <Footer {...props} />}
			initialRouteName={constants.drawerRoutes.ALBUMSCREEN}
		>
			<Drawer.Screen
				name={constants.drawerRoutes.ALBUMSCREEN}
				component={AlbumsScreen}
				options={{
					title: constants.drawerTitles.ALBUM,
					drawerIcon: ({ color }) => (
						<Ionicons name="home" size={25} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name={constants.drawerRoutes.LIBRARYSCREEN}
				component={LibraryScreen}
				options={{
					title: constants.drawerTitles.LIBRARY,
					drawerIcon: ({ color }) => (
						<Ionicons name="library" size={25} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name={constants.drawerRoutes.DOWNLOADSCREEN}
				component={DownloadsScreen}
				options={{
					title: constants.drawerTitles.DOWNLOADS,
					drawerIcon: ({ color }) => (
						<Octicons name="download" size={25} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name={constants.drawerRoutes.SETTINGSCREEN}
				component={SettingsScreen}
				options={{
					title: constants.drawerTitles.SETTINGS,
					drawerIcon: ({ color }) => (
						<Octicons name="gear" size={25} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name={constants.drawerRoutes.SEARCHSCREEN}
				component={SearchScreen}
				options={{
					title: constants.drawerTitles.SEARCH,
					drawerIcon: ({ color }) => (
						<Ionicons name="search" size={25} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Drawer.Screen
				name={constants.drawerRoutes.ABOUTSCREEN}
				component={AboutScreen}
				options={{
					title: constants.drawerTitles.ABOUT,
					drawerIcon: ({ color }) => (
						<Ionicons name="information-sharp" size={25} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name={constants.drawerRoutes.VERSIONSCREEN}
				component={VersionScreen}
				options={{
					title: constants.drawerTitles.VERSION,
					drawerIcon: ({ color }) => (
						<Octicons name="versions" size={25} color={color} />
					),
					drawerItemStyle: { display: "none" },
				}}
			/>
			<Drawer.Screen
				name={constants.drawerRoutes.PLAYERSCREEN}
				component={PlayerScreen}
				options={{
					title: constants.drawerTitles.PLAYER,
					drawerIcon: ({ color }) => (
						<Octicons name="play" size={25} color={color} />
					),
					headerShown: false,
				}}
			/>
		</Drawer.Navigator>
	);
};

export default DashboardScreen;
