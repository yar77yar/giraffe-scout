import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  Modal as ReactModal,
} from "react-native";
import TripNotificationModal from "../ui/Modals/TripNotificationModal";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import FirstRideCopy from "./FirstRideCopy";
import TripProcessInfo from "./TripProcessInfo";
import StartTripProcess from "./StartTripProcess";
import { useTripProcessStore } from "@/stores/trip-process.store";
import TariffModal from "../tariff/TariffModal";
import { useScooterStore } from "@/stores/scooter-store";
import tripService from "@/services/trip.service";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Location from "expo-location";
import { START_GEOFENCING } from "@/hooks";
import { useLocationStore } from "@/stores/location-store";
import { useGeofenceStore } from "@/stores/geofence-store";
import { IStartTripRoot } from "@/interfaces/trip/start-trip.interface";
import EndTripCamera from "./camera/EndTripCamera";
import Modal from "react-native-modal";
import { useCameraStore } from "@/stores/camera-store";

type Props = {
  closeScooterBottomSheet: () => void;
};

const TripProcess: FC<Props> = ({ closeScooterBottomSheet }) => {
  const [isNotificaton, setIsNotificaton] = useState<boolean>(false);

  const [isTripStated, setIsTripStarted] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const [isTripEnd, setIsTripEnd] = useState(false);

  const [isNotParkingHere, setIsNotParkingHere] = useState(false);

  const { geofencingEventType } = useLocationStore();
  const { geofences } = useGeofenceStore();

  const { selectedTripToEnd, setSelectedTripToEnd } = useTripProcessStore();
  const { cameraIsVisible, setIsCameraVisible } = useCameraStore();

  const { top } = useSafeAreaInsets();

  const parkingObj = geofences.map((g) => {
    return {
      latitude: JSON.parse(g.coordinates).lat,
      longitude: JSON.parse(g.coordinates).lng,
      radius: Math.floor(g.radius || 300),
    };
  });

  const startGeofencingAsync = async () => {
    await Location.startGeofencingAsync(START_GEOFENCING, parkingObj);
  };

  const stopGeofencingAsync = async () => {
    await Location.stopGeofencingAsync(START_GEOFENCING);
  };

  const { selectedScooter, setSelectedScooter } = useScooterStore();
  const {
    trips,
    selectedTariff,
    setTrip,
    setSelectedTariff,
    deleteTrip,
    setActiveTrips,
  } = useTripProcessStore();

  const endTripBottomSheetRef = useRef<BottomSheet>(null);
  const activeTripBottomSheetRef = useRef<BottomSheet>(null);

  const openActiveTripBottomSheet = () =>
    activeTripBottomSheetRef.current?.expand();
  const closeActiveTripBottomSheet = () =>
    activeTripBottomSheetRef.current?.close();

  const openEndTripBottomSheet = () => endTripBottomSheetRef.current?.expand();
  const closeEndTripBottomSheet = () => endTripBottomSheetRef.current?.close();

  // useEffect(() => {
  //   if (trips.length === 0) return;

  //   openActiveTripBottomSheet();
  // }, [trips]);

  const handleSetIsNotParkingHere = () => {
    setIsNotParkingHere(false);
  };

  const getActiveTrips = async () => {
    const res = await tripService.getActiveTrips();
    if (!res) return;
    if (res.length === 0) return;
    setActiveTrips(res);
    setTimeout(() => {
      openActiveTripBottomSheet();
    }, 2000);
  };

  const startTrip = async (tariffId: number) => {
    if (!selectedScooter) {
      Alert.alert("Нет выбранного скутера");
      return;
    }
    setLoading(true);
    try {
      const data = await tripService.start(
        selectedScooter.scooter.deviceId,
        tariffId
      );
      setTrip(data);
      setSelectedTariff(null);
      closeScooterBottomSheet();
      openActiveTripBottomSheet();
      setLoading(false);
      // startGeofencingAsync();
    } catch (err) {
      Alert.alert("Не удалось начать поездку");
    } finally {
      setLoading(false);
    }
  };

  const handleSetSelectedTripToEnd = (trip: IStartTripRoot | null) => {
    endTripBottomSheetRef.current?.expand();
    setSelectedTripToEnd(trip);
  };

  const endTrip = async () => {
    // if (geofencingEventType === 2) {
    //   setIsNotParkingHere(true);
    //   return;
    // }

    if (!selectedTripToEnd) return;

    try {
      const res = await tripService.end(
        selectedTripToEnd?.tripInfo.id,
        selectedTripToEnd?.uuid
      );
      // Alert.alert("Поездка завершена");
      deleteTrip(selectedTripToEnd?.uuid);
      if (trips.length > 1) return;
      closeActiveTripBottomSheet();
      // stopGeofencingAsync();
    } catch (error) {
      Alert.alert("Не удалось завершить поездку");
    } finally {
      endTripBottomSheetRef.current?.close();
      setIsCameraVisible(true);
    }
  };

  useEffect(() => {
    getActiveTrips();
  }, []);

  // useEffect(() => {
  //   if (trips.length > 0 && geofences.length > 0) {
  //     startGeofencingAsync();
  //   }
  // }, [trips.length, geofences.length]);

  const handleTripEnd = () => {
    setIsCameraVisible(false);
    setIsTripEnd(true);
  };

  return (
    <Fragment>
      {/* <Button title="Завершение поездки" onPress={openEndTripBottomSheet} /> */}

      {/* BottomSheet Завершения поездки */}

      <Modal
        coverScreen={false}
        isVisible={cameraIsVisible}
        style={{ margin: 0 }}
      >
        <EndTripCamera handleTripEnd={handleTripEnd} />
      </Modal>

      <GestureRecognizer onSwipeDown={() => setSelectedTariff(null)}>
        <ReactModal
          visible={!!selectedTariff}
          animationType="slide"
          presentationStyle="formSheet"
          onRequestClose={() => setSelectedTariff(null)}
        >
          <TariffModal startTrip={startTrip} />
        </ReactModal>
      </GestureRecognizer>

      <BottomSheet
        containerStyle={{
          marginTop: top,
        }}
        ref={activeTripBottomSheetRef}
        index={-1}
        enableDynamicSizing={true}
        enablePanDownToClose={false}
        handleIndicatorStyle={{
          backgroundColor: "#CACACA",
          width: 36,
          height: 4,
        }}
        handleHeight={0}
        backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
        handleStyle={{ padding: 6 }}
      >
        <BottomSheetScrollView>
          {loading ? (
            <StartTripProcess />
          ) : (
            <TripProcessInfo
              handleSetSelectedTripToEnd={handleSetSelectedTripToEnd}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>

      <BottomSheet
        containerStyle={{
          marginTop: top,
        }}
        ref={endTripBottomSheetRef}
        index={-1}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: "#CACACA",
          width: 36,
          height: 4,
        }}
        handleHeight={0}
        backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
        handleStyle={{ padding: 6 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.3}
            enableTouchThrough={false}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            style={[{ backgroundColor: "#000" }, gStyles.absoluteFillObject]}
          />
        )}
      >
        <BottomSheetScrollView>
          <View style={styles.rideEndContainer}>
            <Text style={styles.rideEndTitle}>Завершить поездку?</Text>

            <View style={styles.rideEndRecBox}>
              <View style={styles.rideEndRecCard}>
                <Image
                  style={styles.rideEndThanksImg}
                  source={require("../../assets/images/ride/parking.png")}
                  resizeMode="contain"
                />
                <View style={styles.rideEndRecTxt}>
                  <View style={styles.rideEndRecPlease}>
                    <Text
                      style={[styles.rideEndDepositDesc, styles.rideEndRecBold]}
                    >
                      Пожалуйста,
                    </Text>
                  </View>
                  <Text style={styles.rideEndDepositDesc}>
                    припаркуйте самокат так, чтобы он никому не мешал.
                  </Text>
                </View>
              </View>
              <View style={styles.rideEndRecCard}>
                <Image
                  style={styles.rideEndThanksImg}
                  source={require("../../assets/images/ride/scooter.png")}
                  resizeMode="contain"
                />
                <View style={styles.rideEndRecTxt}>
                  <Text style={styles.rideEndDepositDesc}>
                    Проверьте, что самокат припаркован надежно, чтобы избежать
                    случайных повреждений.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={mzStyles.BtnBox}>
            <TouchableOpacity style={mzStyles.BtnOk} onPress={() => endTrip()}>
              <Text style={mzStyles.BtnOkTxt}>Да, сделать фото</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>

      <View style={gStyles.alertRideContainer}>
        {/* О въезде в зоны запрета */}
        {/* <View style={[gStyles.alertBoxMess, gStyles.alertBgRed]}>
          <Image
            style={gStyles.tapOfferIcon}
            source={require("../../assets/images/ride/stop-alert.png")}
          />
          <View style={gStyles.alertWrapperTxt}>
            <Text style={gStyles.alertBoxTxtW}>
              Здесь кататься запрещено, пожалуйста вернитесь в светлую зону
            </Text>
          </View>
        </View> */}

        {/* О низком заряде самоката */}
        {/* <View style={[gStyles.alertBoxMess, gStyles.alertBgRed]}>
          <Image
            style={gStyles.tapOfferIcon}
            source={require("../../assets/images/ride/low-charge-scoot.png")}
          />
          <View style={gStyles.alertWrapperTxt}>
            <Text style={gStyles.alertBoxTxtW}>
              Низкий заряд самоката, пожалуйста, найдите ближайшую парковку и
              завершите аренду
            </Text>
          </View>
        </View> */}

        {/* Об ограничении скорости */}
        {/* <View style={[gStyles.alertBoxMess, gStyles.alertBgOth]}>
          <Image
            style={gStyles.tapOfferIcon}
            source={require("../../assets/images/ride/speed-low.png")}
          />
          <View style={gStyles.alertWrapperTxt}>
            <Text style={gStyles.alertBoxTxtW}>
              Здесь установлен скоростной режим, самокат сбросит скорость
              автоматически
            </Text>
          </View>
        </View> */}
        {/* <FirstRideCopy /> */}
      </View>

      {/* Уведомление - при Завершении поездки в ЗОНЕ ЗАПРЕТА */}
      {/* <TripNotificationModal
        title="Здесь нельзя оставлять самокат"
        description="Завершить поездку можно только на парковке. Они отмечены на карте специальным знаком - 🅿️"
        buttons={["Понятно"]}
        icon={require("../../assets/images/zone-in-modal/no-parking.png")}
      /> */}

      {/* Уведомление - при Завершении поездки ВНЕ ПАРКОВКИ */}
      {isNotParkingHere && (
        <TripNotificationModal
          handleClose={handleSetIsNotParkingHere}
          title="Здесь нет нашей парковки"
          description="Завершить поездку можно только на парковке. Они отмечены на карте специальным знаком - 🅿️"
          buttons={["Понятно"]}
          icon={require("../../assets/images/ride/alert.png")}
        />
      )}

      {/* Окончание поездки, модалка с информацией (и отзывом) */}
      <ReactModal
        style={{ borderRadius: 100, overflow: "hidden" }}
        visible={isTripEnd}
        onRequestClose={() => setIsTripEnd(false)}
      >
        <ScrollView style={gStyles.f1}>
          <View style={styles.rideEndContainer}>
            <Text style={styles.rideEndTitle}>Поездка завершена</Text>
            <View style={styles.rideEndThanks}>
              <Image
                style={styles.rideEndThanksImg}
                source={require("../../assets/images/promo/success.png")}
                resizeMode="contain"
              />
              <Text style={styles.rideEndThanksDesc}>
                Спасибо, что выбрали нас. Мы это ценим!
              </Text>
            </View>
            <View style={gStyles.pageItemLine}></View>

            <View style={styles.rideEndDetail}>
              <Text style={styles.rideEndDetailTitle}>Детали</Text>
              <View style={styles.rideEndDetailInfo}>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Время в пути</Text>
                  <Text style={gStyles.tabHtripInnerTxt}>30:27</Text>
                </View>

                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Расстояние</Text>
                  <Text style={gStyles.tabHtripInnerTxt}>2.1км</Text>
                </View>

                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Стоимость</Text>
                  <Text style={gStyles.tabHtripInnerTxt}>
                    {selectedTripToEnd?.tripInfo.pricing.minute} &#8381;
                  </Text>
                </View>
              </View>
            </View>

            <View style={gStyles.pageItemLine}></View>
            <View style={styles.rideEndDeposit}>
              <Text style={styles.rideEndDepositDesc}>
                Сумма залога 300 &#8381; уже была возвращена на вашу карту.
                Обычно деньги зачисляют сразу, но это зависит от условий банка.
                Иногда процесс занимает от 3 до 7 рабочих дней.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={[mzStyles.BtnBox, gStyles.downPos]}>
          <TouchableOpacity
            style={mzStyles.BtnOk}
            onPress={() => setIsTripEnd(false)}
          >
            <Text style={mzStyles.BtnOkTxt}>Ок!</Text>
          </TouchableOpacity>
        </View>
      </ReactModal>

      {/* ОКНО ОПОВЕЩЕНИЯ ОБ УДАЛЕНИИ АККАУНТА */}
      {/* <Modal>
          <View style={gStyles.modalAcDelContainer}>
          <Image
            style={gStyles.passCardNopassIcon}
            source={require("../../assets/images/pass/no-pass.png")}
          />
            <Text style={gStyles.rideEndTitle}>Аккаунт удален</Text>
            <Text style={gStyles.tabHtripInnerTxt}>
              Если что, возвращайся, мы всегда рады тебя видеть))
            </Text>
            <TouchableOpacity style={mzStyles.BtnOk}>
              <Text style={mzStyles.BtnOkTxt}>Ок</Text>
            </TouchableOpacity>
          </View>
      </Modal> */}
      {/* end ОКНО ОПОВЕЩЕНИЯ ОБ УДАЛЕНИИ АККАУНТАА */}
    </Fragment>
  );
};

export default TripProcess;

const styles = StyleSheet.create({
  rideEndContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 20,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  rideEndTitle: {
    color: "#000",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  rideEndThanks: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#6FB0F2",
    borderRadius: 18,
  },
  rideEndThanksDesc: {
    color: "#FDF6F6",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
    textAlign: "center",
  },
  rideEndThanksImg: {
    width: 40,
    height: 40,
  },
  rideEndDeposit: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#f2f4f6",
    borderRadius: 18,
  },
  rideEndDepositDesc: {
    color: "#000",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "left",
  },
  rideEndDetail: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
  },
  rideEndDetailTitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
    color: "#262626",
  },
  rideEndDetailInfo: {
    display: "flex",
    gap: 16,
    alignSelf: "stretch",
  },
  // Модлка завершить поездку
  rideEndRecBox: {
    display: "flex",
    gap: 20,
  },
  rideEndRecCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f2f4f6",
    padding: 12,
    borderRadius: 12,
    // flex: 1,
  },
  rideEndRecTxt: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // flexWrap: "wrap",
  },
  rideEndRecPlease: {
    display: "flex",
    alignSelf: "flex-start",
    borderBottomColor: "#FEC303",
    borderBottomWidth: 2,
  },
  rideEndRecBold: {
    fontWeight: "500",
  },
});
