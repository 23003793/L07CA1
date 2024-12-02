import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Qistina To-Do List' }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{ title: 'Edit Task' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
