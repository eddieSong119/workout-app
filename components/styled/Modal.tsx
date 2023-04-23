import { FunctionComponent, useState } from "react";
import { View, StyleSheet, Modal as ReactNativeModal } from "react-native";
import { PressableText } from "./PressableText";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
  children: FunctionComponent<{
    handleOpen: () => void;
    handleClose: () => void;
  }>;
};

export function Modal({ activator: Activator, children }: ModalProps) {
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleOpen = () => setModalVisibility(true);
  const handleClose = () => setModalVisibility(false);

  return (
    <>
      <ReactNativeModal visible={modalVisibility} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.contentView}>
            {children({ handleOpen, handleClose })}
          </View>
          <PressableText text="Close" onPress={handleClose} />
        </View>
      </ReactNativeModal>
      {Activator ? (
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText text="Open" onPress={handleOpen} />
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
