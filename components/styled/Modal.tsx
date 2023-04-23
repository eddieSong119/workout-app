import { FunctionComponent, useState } from "react";
import { View, StyleSheet, Modal as ReactNativeModal } from "react-native";
import { PressableText } from "./PressableText";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
  children: React.ReactNode;
};

export function Modal({ activator: Activator, children }: ModalProps) {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <>
      <ReactNativeModal visible={modalVisibility} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.contentView}>{children}</View>
          <PressableText
            text="Close"
            onPress={() => setModalVisibility(false)}
          />
        </View>
      </ReactNativeModal>
      {Activator ? (
        <Activator handleOpen={() => setModalVisibility(true)} />
      ) : (
        <PressableText text="Open" onPress={() => setModalVisibility(true)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginBottom: 20,
  },
});
