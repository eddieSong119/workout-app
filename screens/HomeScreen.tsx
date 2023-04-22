import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { MontserratText } from "../components/styled/MontserratText";
import data from "../data.json";
import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackHeaderProps["navigation"];
}) {
  return (
    <View style={styles.container}>
      <MontserratText style={{ fontSize: 30 }}>New Workout</MontserratText>
      <FlatList
        data={data as Workout[]}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("WorkoutDetail", {
                  slug: item.slug,
                })
              }
            >
              <WorkoutItem item={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.slug}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
