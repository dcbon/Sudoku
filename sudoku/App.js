import 'react-native-gesture-handler';
import { NavigationContainer  } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Game, Home, Finish } from './src/pages'
import { Provider } from "react-redux"
import store from './src/store'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(208, 141, 133)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(208, 141, 133)',
    text: 'rgb(30, 30, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={Home}
              options={{
                title: "SUGOKU",
                headerTitleAlign: "center"
              }}
            />
            <Stack.Screen
              name="GameScreen"
              component={Game}
              options={{
                title: "Gameplay",
                headerTitleAlign: "center"
              }}
            />
            <Stack.Screen
              name="FinishScreen"
              component={Finish}
              options={{
                title: "Game Ended",
                headerTitleAlign: "center"
              }}
            />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

