import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import AlbumsScreen from '../../screens/AlbumsScreen/AlbumsScreen';
import RightHeaderButton from './components/RightHeaderButton';
import CenterHeader from './components/CenterHeader';
import VersionScreen from "../VersionScreen/VersionScreen";
import AboutScreen from "../AboutScreen/AboutScreen";
import DownloadsScreen from "../DownloadsScreen/DownloadsScreen";
import SettingsScreen from "../SettingsScreen/SettingsScreen";
import LibraryScreen from "../LibraryScreen/LibraryScreen";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Footer from './components/Footer';
import PlayerScreen from '../PlayerScreen/PlayerScreen';

const Drawer = createDrawerNavigator();


const DashboardScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: CenterHeader,
        headerRight: () => RightHeaderButton({ navigation }),
        drawerActiveTintColor: '#6200ee',
        drawerInactiveTintColor: '#000',
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 280,
        },
        headerTitleAlign: 'left'
      }}
      drawerContent={(props) => <Footer {...props} />}
      initialRouteName="AlbumsScreen"
    >
      <Drawer.Screen
        name="AlbumsScreen"
        component={AlbumsScreen}
        options={{
          title: "Home",
          drawerIcon: ({ color }) => <Ionicons name="home" size={25} color={color} />,
        }}
      />
      <Drawer.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          title: "Library",
          drawerIcon: ({ color }) => <Ionicons name="library" size={25} color={color} />,
        }}
      />
      <Drawer.Screen
        name="DownloadsScreen"
        component={DownloadsScreen}
        options={{
          title: "Downloads",
          drawerIcon: ({ color }) => <Octicons name="download" size={25} color={color} />,
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          drawerIcon: ({ color }) => <Octicons name="gear" size={25} color={color} />,
        }}
      />
      <Drawer.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Search",
          drawerIcon: ({ color }) => <Ionicons name="search" size={25} color={color} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "About",
          drawerIcon: ({ color }) => <Ionicons name="information-sharp" size={25} color={color} />,
        }}
      />
      <Drawer.Screen
        name="VersionScreen"
        component={VersionScreen}
        options={{
          title: "Version",
          drawerIcon: ({ color }) => <Octicons name="versions" size={25} color={color} />,
          drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{
          title: "Player",
          drawerIcon: ({ color }) => <Octicons name="play" size={25} color={color} />,
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  );
};

export default DashboardScreen;


