import { FC, ReactNode } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import mzStyles from "@/styles/mod-zone-style";

type Props = {
  icon?: any;
  title: string;
  description: string;
  buttons: string[];
  handleClose: () => void;
};

const TripNotificationModal: FC<Props> = (props) => {
  const { icon, title, description, buttons, handleClose } = props;

  return (
    <Modal isVisible>
      <View style={styles.modalContent}>
        {icon && (
          <Image style={styles.modalImg} source={icon} resizeMode="contain" />
        )}
        <View style={styles.titleContainer}>
          {/* <Text style={styles.title}>Промокод</Text> */}
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.title}> успешно активирован!</Text>
          <Text style={styles.title}> Вам зачислено</Text>
          <Text style={[styles.title, styles.titleBold]}>123</Text> */}
          <Text style={styles.messDesc}>{description}</Text>
        </View>
        <View style={styles.btnArea}>
          {buttons &&
            buttons.map((button) => (
              <TouchableOpacity
                style={mzStyles.BtnOk}
                key={Math.random()}
                onPress={() => handleClose()}
              >
                <Text style={mzStyles.BtnOkTxt}>{button}</Text>
              </TouchableOpacity>
            ))}
        </View>
        {/* <View style={styles.btnArea}> {buttons}</View> */}
      </View>
    </Modal>
  );
};

export default TripNotificationModal;

const styles = StyleSheet.create({
  modalContent: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    // height: "25%",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    // borderTopRightRadius: 18,
    // borderTopLeftRadius: 18,
    borderRadius: 18,
    position: "absolute",
  },
  modalImg: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    // height: "16%",
    // backgroundColor: "#464C55",
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
    // alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
  },
  title: {
    color: "#000",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  messDesc: {
    color: "#000",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  btnArea: {
    display: "flex",
    // alignItems: "flex-end",
    alignSelf: "stretch",
    paddingTop: 16,
  },
  btnAreaBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: 'stretch',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 200,
    backgroundColor: "#f2f4f6",
  },
  btnTxt: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});
