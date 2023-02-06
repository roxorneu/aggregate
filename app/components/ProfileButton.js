import { Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import strings from "../config/strings";

export default function ProfileButton(props) {
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate(strings.profileScreen);
      }}
      style={{ paddingRight: 20 }}
    >
      <FontAwesome5 name="user-circle" size={22} color="black" />
    </Pressable>
  );
}
