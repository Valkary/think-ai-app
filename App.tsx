import React, { useEffect } from "react";
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
import Login from "./components/pages/Login";
import Users from "./components/pages/Users";

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

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {
          authState.success ?
            <>
              <Tab.Screen name="Medallas" component={UserAchievments} />
              <Tab.Screen name="Usuarios" component={Users} />
            </> :
            <>
              <Tab.Screen name="Registro" component={RegisterUser} />
              <Tab.Screen name="Inicio de sesion" component={Login} />
            </>
        }
      </Tab.Navigator>
    </NavigationContainer>
  )
}
