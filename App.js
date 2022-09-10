import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpecialtyForm from './pages/Special'
import Home from './pages/home';
import MonthlyMeal from './pages/Monthly'
import MonthlyForm from './pages/MonthlyReg'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} headerMode='false'/>
        <Stack.Screen name="SpecialtyForm" component={SpecialtyForm} />
        <Stack.Screen name="MonthlyMeal" component={MonthlyMeal} />
        <Stack.Screen name="MonthlyForm" component={MonthlyForm} />
      </Stack.Navigator>
  </NavigationContainer>
  );
} 

