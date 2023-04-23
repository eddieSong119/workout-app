import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";

export type WorkoutItemFormType = {
  name: string;
  duration: string;
  type: string;
  reps?: string;
};

type WorkoutItemProps = {
  onSubmit: (form: WorkoutItemFormType) => void;
};

const selectionItems = ["Exercise", "Break", "Stretch"];

export default function WorkoutItemForm({ onSubmit }: WorkoutItemProps) {
  const { control, handleSubmit } = useForm();
  const [isSelectionOn, setIsSelectionOn] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder="Name"
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder="Duration - sec"
              />
            )}
          />
        </View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{ required: false }}
            name="reps"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder="Repetitions*"
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View style={{ flex: 1 }}>
                {isSelectionOn ? (
                  <View>
                    {selectionItems.map((selection) => (
                      <PressableText
                        style={styles.selection}
                        key={selection}
                        text={selection}
                        onPressIn={() => {
                          setIsSelectionOn(false);
                          onChange(selection);
                        }}
                      />
                    ))}
                  </View>
                ) : (
                  <TextInput
                    style={styles.input}
                    onPressIn={() => setIsSelectionOn(true)}
                    placeholder="Type"
                    value={value}
                  />
                )}
              </View>
            )}
          />
        </View>
        <PressableText
          style={{ marginTop: 10 }}
          text="Add to your workout flow"
          onPress={handleSubmit((data) => {
            onSubmit(data as WorkoutItemFormType);
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    margin: 2,
    borderWidth: 1,
    height: 30,
    padding: 5,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  rowContainer: {
    flexDirection: "row",
  },
  selection: {
    margin: 2,
    padding: 3,
    alignSelf: "center",
  },
});
