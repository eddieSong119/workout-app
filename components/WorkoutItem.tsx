import { StyleProp, ViewStyle } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Workout } from "../types/data";
import { secToMin } from "../utilities/time";

export default function WorkoutItem({
  item,
  children,
  childStyles = {},
}: {
  item: Workout;
  children?: React.ReactNode;
  childStyles?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.duration}>Duration: {secToMin(item.duration)}</Text>
      <Text style={styles.difficulty}>Difficulty: {item.difficulty}</Text>
      {children ? <View style={childStyles}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  duration: {
    fontSize: 15,
  },
  difficulty: {
    fontSize: 15,
  },
});
