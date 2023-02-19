import "react-native-gesture-handler";

import { LogBox } from "react-native";

import { useFonts } from "expo-font";

import AppNavigator from "./app/navigation/AppNavigator";

const App = () => {
  LogBox.ignoreAllLogs();

  const [fontsLoaded] = useFonts({
    RobotoMono: require("./app/assets/RobotoMono.ttf"),
    RobotoMonoBold: require("./app/assets/RobotoMono-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <AppNavigator />;
};

export default App;
