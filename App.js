import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayerScreen from './screens/PlayerScreen/PlayerScreen';
import { StatusBar } from 'expo-status-bar';
import { PlayerProvider } from './contexts/PlayerContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PlayerProvider>
      <StatusBar hidden={true}/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}
