import { IStartTripRoot } from "@/interfaces/trip/start-trip.interface";
import tripService from "@/services/trip.service";
import gStyles from "@/styles/style";
import { FC, Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

type Props = {
  trip: IStartTripRoot;
  handleSetSelectedTripToEnd: (trip: IStartTripRoot | null) => void;
};

const TripProcessItem: FC<Props> = ({ trip, handleSetSelectedTripToEnd }) => {
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [price, setPrice] = useState<number>(0);

  const [pause, setPause] = useState<boolean>(false);
  const [pauseOnLoading, setPauseOnLoading] = useState(false);
  const [pauseOffLoading, setPauseOffLoading] = useState(false);

  const getCurrentTime = () => {
    const targetTime = new Date(trip.tripInfo.startTime);

    const currentTime = new Date();

    let totalSeconds =
      (currentTime.getTime() - new Date(trip.tripInfo.startTime).getTime()) /
      1000;

    if (
      trip.tripInfo.pauseIntervals &&
      trip.tripInfo.pauseIntervals.length > 0
    ) {
      for (const interval of trip.tripInfo.pauseIntervals) {
        if (interval.start && interval.end) {
          const intervalStartTime = new Date(interval.start).getTime();
          const intervalEndTime = new Date(interval.end).getTime();

          totalSeconds -= (intervalEndTime - intervalStartTime) / 1000;
        }
      }
    }

    if (totalSeconds < 0) {
      totalSeconds = Math.abs(totalSeconds);
    }

    // let difference = targetTime.getTime() - currentTime.getTime();

    // if (difference < 0) {
    //   difference = Math.abs(difference);
    // }

    // const secondsDifference = Math.floor(difference / 1000);

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.ceil(totalSeconds % 60);

    hours = hours < 10 ? 0 + hours : hours;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    seconds = seconds < 10 ? 0 + seconds : seconds;

    const totalMinutes = hours * 60 + minutes + Math.ceil(seconds / 60);

    setPrice(trip.tripInfo.pricing.minute * totalMinutes);

    setSeconds(seconds);
    setMinutes(minutes);
    setHours(hours);
  };

  useEffect(() => {
    getCurrentTime();
  }, []);

  useEffect(() => {
    if (pause) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (seconds === 59) {
        setSeconds(1);
        setMinutes((prev) => prev + 1);
        setPrice((prev) => prev + trip.tripInfo.pricing.minute);
      }
      if (minutes === 60) {
        setSeconds(1);
        setMinutes(0);
        setHours((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pause, seconds, minutes, hours]);

  function makeTwoDigits(num: number) {
    if (num >= 0 && num <= 9) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }

  const handlePauseOn = async () => {
    setPauseOnLoading(true);
    try {
      const res = await tripService.pauseOn(trip.uuid);
      setPause(true);
    } catch (err) {
      Alert.alert("Не удалось поставить поездку на паузу");
    } finally {
      setPauseOnLoading(false);
    }
  };

  const handlePauseOff = async () => {
    setPauseOffLoading(true);
    try {
      const res = await tripService.pauseOff(trip.uuid);
      setPause(false);
    } catch (err) {
      Alert.alert("Не удалось снять поездку с паузы");
    } finally {
      setPauseOffLoading(false);
    }
  };

  return (
    <Fragment>
      <View style={gStyles.cardRide}>
        {/* Блок со статусом и таймером */}
        <View style={gStyles.statusTimeBox}>
          <View style={gStyles.statusBox}>
            <View
              style={{
                ...gStyles.statusDotColor,
                backgroundColor: !pause ? "#FEC303" : "#B0AC9F", //включен
                // backgroundColor:"#B0AC9F", // на паузе
              }}
            ></View>
            {/* Когда включен и ставим на паузу */}
            {!pause && !pauseOnLoading && (
              <Text style={gStyles.statusName}>Включен</Text>
            )}

            {pauseOnLoading && (
              <Text style={gStyles.statusName}>Ставим на паузу...</Text>
            )}

            {/* Когда на паузе и включаем */}

            {pause && !pauseOffLoading && (
              <Text style={gStyles.statusName}>На паузе</Text>
            )}
            {pauseOffLoading && (
              <Text style={gStyles.statusName}>Включаем...</Text>
            )}
          </View>

          <View style={gStyles.timeBox}>
            <Text style={gStyles.timeBoxTxt}>
              {makeTwoDigits(hours)}:{makeTwoDigits(minutes)}:
              {makeTwoDigits(seconds)}
            </Text>
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
              <Text style={gStyles.timeBoxTxtVal}>
                {price.toFixed(1)} &#8381;
              </Text>
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

                <Text style={gStyles.timeBoxTxtVal}>
                  {Math.floor(
                    trip?.tripInfo?.scooter?.rightechScooter?.state?.charge ||
                      100
                  )}
                  %
                </Text>
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
        {!pause ? (
          <TouchableOpacity
            style={[gStyles.rideBtn, gStyles.rideBtnPause]}
            onPress={() => handlePauseOn()}
          >
            <Image
              style={styles.addRentBtnIcon}
              source={require("../../assets/images/ride/pause.png")}
            />
            <Text style={gStyles.rideBtnTxtBG}>Пауза</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[gStyles.rideBtn, gStyles.rideBtnPlay]}
            onPress={() => handlePauseOff()}
          >
            <Image
              style={styles.addRentBtnIcon}
              source={require("../../assets/images/ride/play.png")}
              resizeMode="contain"
            />
            <Text style={gStyles.rideBtnTxtBG}>Включить</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[gStyles.rideBtn, gStyles.rideBtnFinish]}
          onPress={() => handleSetSelectedTripToEnd(trip)}
        >
          <Image
            style={styles.addRentBtnIcon}
            source={require("../../assets/images/ride/stop.png")}
          />
          <Text style={gStyles.rideBtnTxtW}>Завершить</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default TripProcessItem;

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
    borderTopWidth: 3,
    borderTopColor: "#000",
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
