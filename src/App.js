import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PlayerScreen from "./screens/PlayerScreen/PlayerScreen";
import { StatusBar } from "expo-status-bar";
import { PlayerProvider } from "./contexts/PlayerContext";
import AlbumsScreen from "./screens/AlbumsScreen/AlbumsScreen";
import setupPlayer from "./utils/setupPlayer";
import TrackPlayer from "react-native-track-player";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen";
import AlbumViewerScreen from "./screens/AlbumViewerScreen/AlbumViewerScreen";
import Constants from "./constants/constants";
import FloatingPlayerScreen from "./screens/FloatingPlayerScreen/FloatingPlayerScreen";
import autoUpdateFetch from "./utils/autoUpdateFetch";
import loadFonts from "./utils/fontLoader";
import { ThemeProvider } from "./contexts/ThemeContext";

const Stack = createStackNavigator();
const constants = new Constants();

export default function App() {
	const [playerInitialized, setPlayerInitialized] = useState(false);
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		const loadAppFonts = async () => {
			await loadFonts();
			setFontsLoaded(true);
		};

		loadAppFonts();
	}, []);
	
	useEffect(() => {
		if (!__DEV__) {
			autoUpdateFetch();
		}
	}, []);

	useEffect(() => {
		const initializePlayer = async () => {
			try {
				if (!playerInitialized) {
					await setupPlayer();
					setPlayerInitialized(true);
					return async () => await TrackPlayer.destroy();
				}
			} catch (error) {
				// setPlayerInitialized(true);
				console.error("Error setting up player", error);
			}
		};
		initializePlayer();
	}, [playerInitialized]);

	return fontsLoaded && (
		<ThemeProvider>
			<PlayerProvider>
				<StatusBar backgroundColor={"transparent"} translucent />
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{ headerShown: false }}
						initialRouteName={constants.screenRoutes.DASHBOARDSCREEN}
					>
						<Stack.Screen
							name={constants.screenRoutes.PLAYERSCREEN}
							component={PlayerScreen}
						/>
						<Stack.Screen
							name={constants.screenRoutes.ALBUMSCREEN}
							component={AlbumsScreen}
						/>
						<Stack.Screen
							name={constants.screenRoutes.SEARCHSCREEN}
							component={SearchScreen}
						/>
						<Stack.Screen
							name={constants.screenRoutes.DASHBOARDSCREEN}
							component={DashboardScreen}
						/>
						<Stack.Screen
							name={constants.screenRoutes.ALBUMVIEWERSCREEN}
							component={AlbumViewerScreen}
						/>
					</Stack.Navigator>
					<FloatingPlayerScreen playerInitialized={playerInitialized} />
				</NavigationContainer>
			</PlayerProvider>
		</ThemeProvider>
	);
}
