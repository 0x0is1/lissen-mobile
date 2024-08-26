import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayerScreen from './screens/PlayerScreen/PlayerScreen';
import { StatusBar } from 'expo-status-bar';
import { PlayerProvider } from './contexts/PlayerContext';
import AlbumsScreen from './screens/AlbumsScreen/AlbumsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PlayerProvider>
      <StatusBar hidden={true}/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AlbumsScreen">
          <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
          <Stack.Screen name="AlbumsScreen" component={AlbumsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}
