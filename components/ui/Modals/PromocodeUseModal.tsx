import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { PromocodeStatus } from "@/interfaces/promocode";

type Props = {
  type: PromocodeStatus | null | undefined; // Тип ответа, в зависимости от типо показываем контент
  name?: string | undefined;
  isVisible: boolean;
  setModalVisible: () => void;
  codeSum?: number;
};

export default function PromocodeUseModal({
  type,
  name,
  isVisible,
  setModalVisible,
  codeSum,
}: Props) {
  function modelContentFabric() {
    switch (type) {
      case "SUCCESS":
        return (
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImg}
              source={require("../../../assets/images/promo/success.png")}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Промокод</Text>
              <Text
                style={[styles.title, styles.titleBold]}
              >{`«${name}»`}</Text>
              <Text style={styles.title}> успешно активирован!</Text>
              <Text style={styles.title}> Вам зачислено</Text>
              <Text style={[styles.title, styles.titleBold]}>
                {` ${codeSum}`}&#8381;
              </Text>
              <Text style={styles.title}>на баланс кошелька.</Text>
            </View>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btnAreaBox}
                onPress={() => setModalVisible()}
              >
                <Text style={styles.btnTxt}>Понятно</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case "EXPIRED":
        return (
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImg}
              source={require("../../../assets/images/promo/not.png")}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text
                style={[styles.title, styles.titleBold]}
              >{`«${name}»`}</Text>
              <Text style={styles.title}>
                Действие данного промокода истекло.
              </Text>
            </View>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btnAreaBox}
                onPress={() => setModalVisible()}
              >
                <Text style={styles.btnTxt}>Понятно</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case "NOTEXIST":
        return (
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImg}
              source={require("../../../assets/images/promo/not-search.png")}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text
                style={[styles.title, styles.titleBold]}
              >{`«${name}»`}</Text>
              <Text style={styles.title}>
                Увы, {"\n"}промокод не найден. Проверьте правильность написания
                промокода и попробуйте ещё раз.
              </Text>
            </View>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btnAreaBox}
                onPress={() => setModalVisible()}
              >
                <Text style={styles.btnTxt}>Понятно</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case "USED":
        return (
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImg}
              source={require("../../../assets/images/promo/used.png")}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text
                style={[styles.title, styles.titleBold]}
              >{`«${name}»`}</Text>
              <Text style={styles.title}>
                Вы уже использовали данный промокод.
              </Text>
            </View>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btnAreaBox}
                onPress={() => setModalVisible()}
              >
                <Text style={styles.btnTxt}>Понятно</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return (
          <View>
            <Text>Нет такого типа</Text>
          </View>
        );
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={"left"}
      onSwipeComplete={() => setModalVisible()}
    >
      {modelContentFabric()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    display: "flex",
    gap: 16,
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
    width: 60,
    height: 60,
  },
  titleContainer: {
    // height: "16%",
    // backgroundColor: "#464C55",
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
  },
  title: {
    color: "#000",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  titleBold: {
    fontWeight: "700",
  },
  btnArea: {
    display: "flex",
    alignItems: "flex-end",
    alignSelf: "stretch",
    // padding: 6,
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
