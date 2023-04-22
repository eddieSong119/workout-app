import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function PlannerScreen() {
  useEffect(() => {
    console.log("Renddering Planer Screen");
  }, []);

  return (
    <View>
      <Text>I am Planner Screen</Text>
    </View>
  );
}
