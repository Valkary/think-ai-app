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
import Dashboard from "./components/pages/Dashboard";
import DashboardIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MedalIcon from "react-native-vector-icons/Ionicons";
import LoginIcon from "react-native-vector-icons/AntDesign";
import SignupIcon from "react-native-vector-icons/Feather";

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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let returnIcon = null;

            switch (route.name) {
              case "Dashboard":
                returnIcon = <DashboardIcon name="view-dashboard-outline" size={size} color={color} />;
                break;
              case "Medallas":
                returnIcon = <MedalIcon name="medal" size={size} color={color} />;
                break;
              case "Inicio de sesion":
                returnIcon = <LoginIcon name="login" size={size} color={color} />;
                break;
              case "Registro":
                returnIcon = <SignupIcon name="user-plus" size={size} color={color} />;
                break;
            }

            return returnIcon;
          },
          tabBarActiveTintColor: '#1b95e0',
          tabBarInactiveTintColor: 'gray',
        })}>
        {
          authState.success ?
            <>
              <Tab.Screen name="Medallas" component={UserAchievments} />
              <Tab.Screen name="Dashboard" component={Dashboard} />
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
