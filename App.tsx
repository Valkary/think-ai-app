import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserAchievments from "./components/pages/UserAchievments";
import { Provider, useSelector } from "react-redux";
import RegisterUser from "./components/pages/RegisterUser";
import { RootState, rootState } from "./redux/stores/rootStore";

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
  return (
    <Provider store={rootState}>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </Provider>
  );
}

function Router() {
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {
          authState.userToken ?
            <Tab.Screen name="Medallas" component={UserAchievments} /> :
            <Tab.Screen name="Registro" component={RegisterUser} />
        }
      </Tab.Navigator>
    </NavigationContainer>
  )
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
