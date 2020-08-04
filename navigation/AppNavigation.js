import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../screens/MainScreen";
import PracticeScreen from "../screens/PracticeScreen";
import AddVerbaScreen from "../screens/AddVerbaScreen";
import VerbaListScreen from "../screens/VerbaListScreen";
import VerbaDetailScreen from "../screens/VerbaDetailScreen";

const PracticeStack = createStackNavigator();

const AppNavigation = (props) => {
  return (
    <NavigationContainer>
      <PracticeStack.Navigator>
        <PracticeStack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
        <PracticeStack.Screen name="Practice" component={PracticeScreen} options={{title: 'Øvelse'}}/>
        <PracticeStack.Screen name="AddVerba" component={AddVerbaScreen}  options={{title: 'Nytt ord'}}/>
        <PracticeStack.Screen name="VerbaList" component={VerbaListScreen}  options={{title: 'Ordliste'}}/>
        <PracticeStack.Screen name="VerbaDetail" component={VerbaDetailScreen}  options={{title: 'Detaljer'}}/>
      </PracticeStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
