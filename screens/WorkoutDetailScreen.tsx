import { View, Text, StyleSheet } from "react-native";
import {
  NativeStackHeaderProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useWorkoutBySlut } from "../hooks/useWorkoutBySlut";
import { RootStackParamList } from "../navigation";
import { Modal } from "../components/styled/Modal";
import { PressableText } from "../components/styled/PressableText";
import { secToMin } from "../utilities/time";
import { FontAwesome } from "@expo/vector-icons";
import WorkoutItem from "../components/WorkoutItem";
import { useEffect, useState } from "react";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

type DetailedParams = {
  route: {
    params: {
      slug: string;
    };
  };
};
type Props = NativeStackScreenProps<RootStackParamList, "WorkoutDetail">;
type Navigation = NativeStackHeaderProps & DetailedParams;

export default function WorkoutDetailScreen({ route }: Navigation) {
  const workout = useWorkoutBySlut(route.params.slug);
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [trackerIndex, setTrackerIndex] = useState(-1);

  const { countDown, isRunning, stop, start } = useCountDown(trackerIndex);

  console.log(isRunning);

  useEffect(() => {
    // check if there's workout loaded
    if (!workout) {
      return;
    }
    // check if the tracking item is still with the range of sequence list
    if (trackerIndex === workout.sequence.length - 1) {
      return;
    }
    // track next item after countdown finished
    if (countDown === 0) {
      addItemToSequence(trackerIndex + 1);
    }
  }, [countDown]);

  const addItemToSequence = (index: number) => {
    const newSequence = [...sequence, workout!.sequence[index]];
    setSequence(newSequence);
    setTrackerIndex(index);
    start(newSequence[index].duration);
  };

  if (!workout) {
    return null;
  }

  const hasReachedEnd =
    sequence.length === workout.sequence.length && countDown === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{workout.name}</Text>
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text={"check sequence"} />
          )}
        >
          <View>
            {workout.sequence.map((SequenceItem, index) => {
              return (
                <View key={SequenceItem.slug} style={styles.sequenceItem}>
                  <Text>
                    {SequenceItem.name} | {SequenceItem.type} |{" "}
                    {secToMin(SequenceItem.duration)}
                  </Text>
                  {index !== workout.sequence.length - 1 ? (
                    <FontAwesome name="arrow-down" />
                  ) : null}
                </View>
              );
            })}
          </View>
        </Modal>
      </WorkoutItem>
      <View style={styles.centerView}>
        {sequence.length === 0 && (
          <FontAwesome
            name="play-circle-o"
            size={50}
            onPress={() => addItemToSequence(0)}
          />
        )}
        {sequence.length > 0 && countDown >= 0 && (
          <View>
            <Text style={{ fontSize: 24 }}>{secToMin(countDown)}</Text>
          </View>
        )}
      </View>
      <View style={styles.centerView}>
        <Text style={{ fontSize: 24 }}>
          {sequence.length === 0
            ? "Prepare"
            : hasReachedEnd
            ? "Great Job"
            : sequence[trackerIndex].name}
        </Text>
      </View>
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
  sequenceItem: {
    alignItems: "center",
  },
  centerView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
});
