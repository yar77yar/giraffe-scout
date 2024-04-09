import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import gStyles from "@/styles/style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

export default function HeadPage() {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={gStyles.pageProfile}>
        <View style={gStyles.pageProfileSection}>
          <Text>Head page</Text>

          <View style={styles.container}>
            <Animatable.Image
              animation="rotate"
              direction="reverse" // Установка направления вращения справа налево
              // iterationCount="infinite"
              duration={3000}
              source={require("../../assets/images/head/wheel.png")}
              style={styles.image}
            />
          </View>

          <Image
            style={styles.image}
            source={require("../../assets/images/head/wheel-trans.gif")}
            resizeMode="contain"
          />

          <Image
            style={styles.imageGRF}
            source={require("../../assets/images/head/grf-on-scooter.gif")}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* ПРЕДЗАГРУЗЧИК */}
      <View style={styles.rideContainer}>
        <View style={styles.loaderContainer}>
          <Text
            style={{
              ...styles.loaderTitle,
              display: "flex",
            }}
          >
            Включаем самокат
          </Text>
          {/* <Text style={{
          ...styles.loaderTitle,
          display: 'flex',
          }}>
          Готово, можно ехать!
        </Text> */}
          {/* <Text style={styles.loaderTitle}>Включаем самокат</Text> */}
          <View style={styles.loaderBox}>
            <Image
              style={styles.imageCloud}
              source={require("../../assets/images/ride/cloud.png")}
              // resizeMode="cover"
            />

            <Image
              style={styles.imageLoader}
              source={require("../../assets/images/ride/grf-ride-loader.gif")}
              // resizeMode="contain"
            />
            {/* <Image
            style={styles.imageLoaderDone}
            source={require("../../assets/images/ride/loader-done.png")}
            resizeMode="contain"
          /> */}
          </View>
        </View>
      </View>
      {/* End ПРЕДЗАГРУЗЧИК */}

      {/* КАРТОЧКА ПОЕЗДКИ */}
      <View style={styles.rideContainer}>
        <View style={styles.qrRentScooterBox}>
          <View style={styles.listRentScooter}>
            {/* Активная - Выбранная карточка для просмотра */}
            <TouchableOpacity
              style={{
                ...styles.itemRentScooter,
                borderColor: "#FEC303",
              }}
            >
              <Image
                style={styles.itemRentScooterIcon}
                source={require("../../assets/images/scooters/qr-mini-card.png")}
              />
              <Text style={styles.itemRentScooterCode}>345-897</Text>
            </TouchableOpacity>

            {/* Не активная - при нажатии появляется инфо другого арендованного самоката */}
            <TouchableOpacity
              style={{
                ...styles.itemRentScooter,
                borderColor: "transparent",
                backgroundColor: "#f2f4f6",
              }}
            >
              <Image
                style={styles.itemRentScooterIcon}
                source={require("../../assets/images/scooters/qr-mini-card.png")}
              />
              <Text style={styles.itemRentScooterCode}>345-897</Text>
            </TouchableOpacity>
          </View>
          {/* Кнопка добавить ещё самокат */}
          <TouchableOpacity style={styles.addRentBtn}>
            <Image
              style={styles.addRentBtnIcon}
              source={require("../../assets/images/ride/plus.png")}
            />
            <Text style={styles.addRentBtnTxt}>Взять ещё</Text>
          </TouchableOpacity>

          {/* <Text style={gStyles.ssioDistanceValueTxt}>≈4ч 38мин</Text> */}
        </View>
        <View style={gStyles.pageItemLine}></View>

        {/* Карточка - инфо о поездке */}
        <View style={gStyles.cardRide}>
          {/* Блок со статусом и таймером */}
          <View style={gStyles.statusTimeBox}>
            <View style={gStyles.statusBox}>
              <View
                style={{
                  ...gStyles.statusDotColor,
                  backgroundColor: "#FEC303", //включен
                  // backgroundColor:"#B0AC9F", // на паузе
                }}
              ></View>
              {/* Когда включен и ставим на паузу */}
              <Text style={gStyles.statusName}>Включен</Text>
              {/* <Text style={gStyles.statusName}>Ставим на паузу...</Text> */}

              {/* Когда на паузе и включаем */}
              {/* <Text style={gStyles.statusName}>На паузе</Text>
            <Text style={gStyles.statusName}>Включаем...</Text> */}
            </View>

            <View style={gStyles.timeBox}>
              <Text style={gStyles.timeBoxTxt}>01:24:56</Text>
              {/* <Text style={gStyles.timeBoxTxt}>14:32</Text> */}
              {/* <Text style={gStyles.timeBoxTxt}>00:24</Text> */}
            </View>
          </View>
          {/* end Блок со статусом и таймером */}

          {/* Блок главная информация */}
          <View style={gStyles.mainWrapper}>
            <View style={gStyles.mainImgBox}>
              <Image
                style={gStyles.mainImgBoxIcon}
                source={require("../../assets/images/ride/grf-ride.png")}
                // resizeMode='stretch'
              />
            </View>
            <View style={gStyles.mainInfoContent}>
              <View style={gStyles.mainInfoContentItem}>
                <Text style={gStyles.timeBoxTxtVal}>1050,48&#8381;</Text>
                <Text style={gStyles.mainDistValue}>10,1км в пути</Text>
              </View>
              <View style={gStyles.mainItemLine}></View>
              <View style={gStyles.mainInfoContentItem}>
                <View style={gStyles.mainBattaryHead}>
                  <View style={gStyles.mainChargeBox}>
                    <View style={gStyles.sLILevelBox}></View>
                    {/* <View style={gStyles.innerShadowContent}> 
                            </View> */}
                    <View style={gStyles.sLILevelIcTxtBox}>
                      <Image
                        style={gStyles.sLILightIcon}
                        source={require("../../assets/images/scooters/light.png")}
                      />
                      {/* <Text>
                      {Math.floor(
                        selectedScooter?.rightechScooter?.state.charge || 100
                      )}
                     50 %
                    </Text> */}
                    </View>
                  </View>

                  <Text style={gStyles.timeBoxTxtVal}>100%</Text>
                </View>
                <Text style={gStyles.mainDistValue}>хватит на 10км</Text>
              </View>
            </View>
          </View>
          {/* end Блок главная информация */}
        </View>
        {/* end Карточка - инфо о поездке */}

        <View style={gStyles.pageItemLine}></View>
        {/* Блок кнопок управления */}
        <View style={gStyles.rideControlWrapper}>
          <TouchableOpacity style={[gStyles.rideBtn, gStyles.rideBtnPause]}>
            <Image
              style={styles.addRentBtnIcon}
              source={require("../../assets/images/ride/pause.png")}
            />
            <Text style={gStyles.rideBtnTxtBG}>Пауза</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[gStyles.rideBtn, gStyles.rideBtnPlay]}>
          <Image
            style={styles.addRentBtnIcon}
            source={require("../../assets/images/ride/play.png")}
            resizeMode='contain'
          />
          <Text style={gStyles.rideBtnTxtBG}>
            Включить
          </Text>
        </TouchableOpacity> */}
          <TouchableOpacity style={[gStyles.rideBtn, gStyles.rideBtnFinish]}>
            <Image
              style={styles.addRentBtnIcon}
              source={require("../../assets/images/ride/stop.png")}
            />
            <Text style={gStyles.rideBtnTxtW}>Завершить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

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
