import { View, Text, StyleSheet } from "react-native";
import { MontserratText } from "../components/styled/MontserratText";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

type DetailedParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

type Navigation = NativeStackHeaderProps & DetailedParams;

export default function WorkoutDetailScreen( { route } : Navigation) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Slug - {route.params.slug}</Text>
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
