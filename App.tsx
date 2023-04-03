import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeBaseProvider,
  extendTheme,
  Container,
} from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserAchievments from "./components/pages/UserAchievments";
import { Provider } from "react-redux";
import { authStore } from "./stores/auth";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType { }
}

const Tab = createBottomTabNavigator();

export default function App() {
  console.log(authStore.getState());

  return (
    <Provider store={authStore}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Tab.Navigator>
            <Tab.Screen name="Medallas" component={UserAchievments} />
          </Tab.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

// TODO: Maybe implement dark mode lol

// Color Switch Component
// function ToggleDarkMode() {
//  const { colorMode, toggleColorMode } = useColorMode();
//  return (
//    <HStack space={2} alignItems="center">
//      <Text>Dark</Text>
//      <Switch
//        isChecked={colorMode === "light"}
//        onToggle={toggleColorMode}
//        aria-label={
//          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//        }
//      />
//      <Text>Light</Text>
//    </HStack>
//  );
//}
