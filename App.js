import "react-native-gesture-handler";

import { LogBox } from "react-native";
import { useFonts } from "expo-font";

import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

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

  let perStore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={perStore}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
