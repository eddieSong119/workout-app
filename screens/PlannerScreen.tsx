import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import slugify from "slugify";

import WorkoutItemForm, {
  WorkoutItemFormType,
} from "../components/WorkoutItemForm";
import { SequenceItem, SequenceType, Workout } from "../types/data";
import PlannerItem from "../components/PlannerItem";
import { PressableText } from "../components/styled/PressableText";
import { Modal } from "../components/styled/Modal";
import WorkoutForm, { WorkoutFormType } from "../components/WorkoutForm";
import { storeWorkout } from "../storage/workout";

export default function PlannerScreen({
  navigation,
}: {
  navigation: NativeStackHeaderProps["navigation"];
}) {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);
  const handleItemSubmit = (form: WorkoutItemFormType) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + " " + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };

    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }

    setSeqItems([...seqItems, sequenceItem]);

    console.log(sequenceItem);
  };

  const computeDiff = (itemsCount: number, totalDuration: number) => {
    const diff = totalDuration / itemsCount;
    if (diff <= 60) {
      return "hard";
    } else if (diff <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };

  const handleWorkoutSubmit = async (form: WorkoutFormType) => {
    console.log(form.name);
    if (seqItems.length > 0) {
      const duration = seqItems.reduce((acc, item) => {
        return acc + item.duration;
      }, 0);
      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + " " + Date.now(), { lower: true }),
        difficulty: computeDiff(seqItems.length, duration),
        sequence: [...seqItems],
        duration: duration,
      };

      await storeWorkout(workout);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        renderItem={({ item, index }) => (
          <PlannerItem item={item}>
            <PressableText
              text="Remove"
              onPressIn={() => {
                const items = [...seqItems];
                items.splice(index, 1);
                setSeqItems(items);
              }}
            />
          </PlannerItem>
        )}
      />
      <WorkoutItemForm onSubmit={handleItemSubmit} />
      <View>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText
              style={{ marginTop: 20 }}
              text="Create Workout"
              onPressIn={handleOpen}
            />
          )}
        >
          {({ handleClose }) => (
            <View>
              <WorkoutForm
                onSubmit={async (data) => {
                  await handleWorkoutSubmit(data);
                  handleClose();
                  setSeqItems([]);
                  navigation.navigate("Home");
                }}
              />
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
