import { Text } from "react-native";
import React from "react";

export function MontserratText(props: Text["props"]) {
  return (
    <Text {...props} style={[{ fontFamily: "montserrat" }, props.style]} />
  );
}
