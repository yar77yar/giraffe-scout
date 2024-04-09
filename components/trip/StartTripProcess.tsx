import { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const StartTripProcess: FC = () => {
  const [isTripStarted, setIsTripStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTripStarted(true);
    }, 2000);

    return () => clearTimeout(timeout);
  });

  return (
    <View style={styles.rideContainer}>
      <View style={styles.loaderContainer}>
        {!isTripStarted ? (
          <Text
            style={{
              ...styles.loaderTitle,
              display: "flex",
            }}
          >
            Включаем самокат
          </Text>
        ) : (
          <Text
            style={{
              ...styles.loaderTitle,
              display: "flex",
            }}
          >
            Готово, можно ехать!
          </Text>
        )}

        {/* <Text style={styles.loaderTitle}>Включаем самокат</Text> */}
        <View style={styles.loaderBox}>
          <Image
            style={styles.imageCloud}
            source={require("../../assets/images/ride/cloud.png")}
            // resizeMode="cover"
          />

          {!isTripStarted ? (
            <Image
              style={styles.imageLoader}
              source={require("../../assets/images/ride/grf-ride-loader.gif")}
              // resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.imageLoaderDone}
              source={require("../../assets/images/ride/loader-done.png")}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default StartTripProcess;

const styles = StyleSheet.create({
  // ПРЕДЗАГРУЗЧИК
  loaderContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  loaderTitle: {
    color: "#000",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  loaderBox: {
    // display: 'flex',
    // alignItems: 'center',
    position: "relative",
    width: 150,
    height: 100,
    // backgroundColor: 'green',
  },
  imageCloud: {
    width: 150,
    height: 100,
  },
  imageLoader: {
    position: "absolute",
    top: 0,
    right: 5,
    width: 133,
    height: 120,
  },
  imageLoaderDone: {
    width: 46,
    height: 48,
    position: "absolute",
    left: 56,
    top: 36,
  },
  // End  ПРЕДЗАГРУЗЧИК

  rideContainer: {
    // paddingTop: 12,
    // paddingBottom: 20,
    backgroundColor: "#fff",
    // borderTopWidth: 3,
    // borderTopColor: "#000",
    display: "flex",
    // alignItems: 'flex-start',
    // flex: 1,
    height: 308,
  },
  qrRentScooterBox: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    // padding: 20,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },

  // карточки кода-номера самоката
  listRentScooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemRentScooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 2,
    borderRadius: 8,
    height: 34,
    paddingLeft: 6,
    paddingRight: 6,
  },
  itemRentScooterCode: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#000",
  },
  itemRentScooterIcon: {
    width: 14,
    height: 14,
  },

  // кнопка добавить ещё самокат
  addRentBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderColor: "#CCBABA",
    borderWidth: 2,
    borderRadius: 8,
    // padding: 20,
    height: 34,
    paddingLeft: 6,
    paddingRight: 6,
  },
  addRentBtnIcon: {
    width: 12,
    height: 12,
  },
  addRentBtnTxt: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#000",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
  },
  imageGRF: {
    width: 80,
    height: 80,
  },

  tariffsScrollContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderTopColor: "#D7F1FA",
    borderWidth: 2,
    // backgroundColor: 'blue',
  },
  tariffsContainer: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
