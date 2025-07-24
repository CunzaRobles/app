// src/App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CurriculumProvider } from './context/CurriculumContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <CurriculumProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
        <AppNavigator />
      </NavigationContainer>
    </CurriculumProvider>
  );
}
