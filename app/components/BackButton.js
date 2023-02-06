import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton(props) {
  return (
    <Pressable
      onPress={() => {
        props.navigation.goBack();
      }}
      style={{ padding: 15 }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
}
