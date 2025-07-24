// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: '#f0f4f8' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Agregar más pantallas aquí según sea necesario */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
