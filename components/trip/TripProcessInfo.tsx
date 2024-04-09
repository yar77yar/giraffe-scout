import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  PanResponder,
} from "react-native";
import gStyles from "@/styles/style";
import tripService from "@/services/trip.service";
import { useTripProcessStore } from "@/stores/trip-process.store";
import { FC, useEffect, useRef, useState } from "react";
import TripProcessItem from "./TripProcessItem";
import PagerView from "react-native-pager-view";
import { IStartTripRoot } from "@/interfaces/trip/start-trip.interface";
import { Swipeable } from "react-native-gesture-handler";
import { ITrip } from "@/interfaces/trip/trip.interface";
import { useCameraStore } from "@/stores/camera-store";

type Props = {
  handleSetSelectedTripToEnd: (trip: IStartTripRoot | null) => void;
};

const TripProcessInfo: FC<Props> = ({ handleSetSelectedTripToEnd }) => {
  const { trips } = useTripProcessStore();
  const { setIsQrCameraVisible } = useCameraStore();

  const pageRef = useRef<PagerView>(null);

  const [activeTrip, setActiveTrip] = useState<IStartTripRoot | null>(trips[0]);

  const handleSetActiveTripFromTabs = (trip: IStartTripRoot) => {
    if (trip.uuid === activeTrip?.uuid) return;
    const index = trips.findIndex((x) => x.uuid === trip.uuid);
    setActiveTrip(trip);
    pageRef.current?.setPage(index);
  };

  useEffect(() => {
    if (!trips.length) return;
    if (trips.length > 1) return;
    setActiveTrip(trips[0]);
  }, [trips.length]);

  useEffect(() => {
    if (!trips.length) return;
    setActiveTrip(trips[0]);
  }, [trips]);

  return (
    <View style={styles.rideContainer}>
      <View style={styles.qrRentScooterBox}>
        <View style={styles.listRentScooter}>
          {/* Активная - Выбранная карточка для просмотра */}
          {trips.length > 0 &&
            trips.map((trip) => (
              <TouchableOpacity
                key={trip.tripInfo.id}
                onPress={() => handleSetActiveTripFromTabs(trip)}
                style={
                  trips.length > 0 &&
                  activeTrip &&
                  trip.uuid === activeTrip.uuid
                    ? {
                        ...styles.itemRentScooter,
                        ...styles.activeTrip,
                      }
                    : { ...styles.itemRentScooter, ...styles.otherTrips }
                }
              >
                <Image
                  style={styles.itemRentScooterIcon}
                  source={require("../../assets/images/scooters/qr-mini-card.png")}
                />
                <Text style={styles.itemRentScooterCode}>
                  {trip?.tripInfo.scooter.scooter.deviceId}
                </Text>
              </TouchableOpacity>
            ))}

          {/* Не активная - при нажатии появляется инфо другого арендованного самоката */}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
        {/* Кнопка добавить ещё самокат */}
        <TouchableOpacity
          style={styles.addRentBtn}
          onPress={() => setIsQrCameraVisible(true)}
        >
          <Image
            style={styles.addRentBtnIcon}
            source={require("../../assets/images/ride/plus.png")}
          />
          <Text style={styles.addRentBtnTxt}>Взять ещё</Text>
        </TouchableOpacity>

        {/* <Text style={gStyles.ssioDistanceValueTxt}>≈4ч 38мин</Text> */}
      </View>
      <View style={gStyles.pageItemLine}></View>

      <PagerView
        initialPage={0}
        style={{ flex: 1 }}
        ref={pageRef}
        orientation={"horizontal"}
        scrollEnabled
      >
        {trips.map((trip, index) => (
          <Swipeable
            key={index}
            onSwipeableWillClose={(dir) => {
              if (dir === "right") {
                if (index === trips.length - 1) return;
                pageRef.current?.setPage(index + 1);
                setActiveTrip(trips[index + 1]);
              } else {
                if (index === 0) return;

                pageRef.current?.setPage(index - 1);
                setActiveTrip(trips[index - 1]);
              }
            }}
          >
            <TripProcessItem
              trip={trip}
              handleSetSelectedTripToEnd={handleSetSelectedTripToEnd}
            />
          </Swipeable>
        ))}
      </PagerView>
    </View>
  );
};

export default TripProcessInfo;

const styles = StyleSheet.create({
  activeTrip: {
    borderColor: "#FEC303",
  },

  otherTrips: {
    borderColor: "transparent",
    backgroundColor: "#f2f4f6",
  },
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
