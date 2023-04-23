import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";

export type WorkoutFormType = {
  name: string;
};

type WorkoutProps = {
  onSubmit: (form: WorkoutFormType) => void;
};

export default function WorkoutForm({ onSubmit }: WorkoutProps) {
  const { control, handleSubmit } = useForm();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{ required: true }}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Workout Name"
            placeholderTextColor={"rgba(0,0,0,0.4)"}
          />
        )}
      />
      <PressableText
        style={{ marginTop: 10 }}
        text="Confirm"
        onPress={handleSubmit((data) => {
          onSubmit(data as WorkoutFormType);
        })}
      />
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
    width: 200,
    margin: 2,
    borderWidth: 1,
    height: 30,
    padding: 5,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
});
