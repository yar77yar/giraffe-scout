import mzStyles from "@/styles/mod-zone-style";
import gStyles from "@/styles/style";
import React, { FC } from "react";
import { Modal, TouchableOpacity, View, Text, Image } from "react-native";

type Props = {
  isModalVisible: boolean;
  handleBackToAuth: () => void;
};

const DeleteProfileModal: FC<Props> = (props) => {
  const { handleBackToAuth, isModalVisible } = props;

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <View style={gStyles.modalAcDelContainer}>
        <Image
          style={gStyles.passCardNopassIcon}
          source={require("../../assets/images/pass/no-pass.png")}
        />
        <Text style={gStyles.rideEndTitle}>Аккаунт удален</Text>
        <Text style={gStyles.tabHtripInnerTxt}>
          Если что, возвращайся, мы всегда рады тебя видеть))
        </Text>
        <TouchableOpacity
          style={mzStyles.BtnOk}
          onPress={() => handleBackToAuth()}
        >
          <Text style={mzStyles.BtnOkTxt}>Ок</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DeleteProfileModal;
