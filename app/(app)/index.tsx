import BottomMenu from "@/components/bottom-menu/BottomMenu";
import NoParking from "@/components/modals-zone/no-parking/NoParking";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";

import gStyles from "../../styles/style";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  // SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Button,
  BackHandler,
  Dimensions,
  Platform,
} from "react-native";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import OutOfZone from "@/components/modals-zone/out-of-zone/OutOfZone";
import PaidParking from "@/components/modals-zone/paid-parking/PaidParking";
import Parking from "@/components/modals-zone/parking/Parking";
import ScooterBanZone from "@/components/modals-zone/scooter-ban-zone/ScooterBanZone";
import SpeedControl from "@/components/modals-zone/speed-control/SpeedControl";
import SpeedControlTime from "@/components/modals-zone/speed-control-time/SpeedControlTime";
import Map from "@/components/map/Map";
import { useGeofenceStore } from "@/stores/geofence-store";
import { geofenceTypeSlug } from "@/enums/geofenceTypesSlugEnum";
import Menu from "@/components/menu/Menu";
import { useLocation } from "@/hooks/use-location";
import { useScooterStore } from "@/stores/scooter-store";
import ScooterInSheet from "@/components/scooters/ScooterInSheet";
import { router } from "expo-router";
import TripProcess from "@/components/trip/TripProcess";
import { useCameraStore } from "@/stores/camera-store";
import MainCamera from "@/components/main-camera/MainCamera";
import Modal from "react-native-modal";
import { useGps } from "@/hooks/use-gps";
import * as TaskManager from "expo-task-manager";
import { LOCATION_TRACKING, START_GEOFENCING } from "@/hooks";
import { LocationObject } from "expo-location";
import { useLocationStore } from "@/stores/location-store";

const Page = () => {
  const { selectedScooter, setSelectedScooter } = useScooterStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetMenuRef = useRef<BottomSheet>(null);
  const scooterBottomSheetRef = useRef<BottomSheet>(null);
  const infoBottomSheetRef = useRef<BottomSheet>(null);

  const { qrCameraIsVisible, setIsQrCameraVisible } = useCameraStore();

  const { setGeofenceType, selectedGeofence } = useGeofenceStore();

  const openBottomSheetMenu = () => bottomSheetMenuRef.current?.expand();
  const closeBottomSheetMenu = () => bottomSheetMenuRef.current?.close();

  const [isInfoExpand, setIsInfoExpand] = useState<boolean>(false);

  // useGps();

  const openInfoBottomSheet = () => {
    infoBottomSheetRef.current?.expand();
    setIsInfoExpand(true);
  };
  const closeInfoSheet = () => {
    infoBottomSheetRef.current?.close();
    setIsInfoExpand(false);
  };

  const open = () => bottomSheetRef.current?.expand();
  const close = () => {
    bottomSheetRef.current?.close();
    setGeofenceType(null);
  };

  const openScooterBottomSheet = () => scooterBottomSheetRef.current?.expand();
  const closeScooterBottomSheetWithoutEffect = () =>
    scooterBottomSheetRef.current?.collapse();
  const closeScooterBottomSheet = () => {
    if (!selectedScooter) {
      return;
    }

    setSelectedScooter(null, null);
    scooterBottomSheetRef.current?.close();
  };

  const insets = useSafeAreaInsets();

  const { location } = useLocation();

  useEffect(() => {
    if (!selectedGeofence) {
      return;
    }
    open();
  }, [selectedGeofence]);

  useEffect(() => {
    if (!selectedScooter) return;
    openScooterBottomSheet();
  }, [selectedScooter]);

  const setBottomSheetComponent = () => {
    switch (selectedGeofence?.type.slug) {
      case geofenceTypeSlug.speedLimitAllDay:
        return <SpeedControl close={close} />;
      case geofenceTypeSlug.notParking:
        return <NoParking close={close} />;
      case geofenceTypeSlug.parkingCircle:
        return <Parking close={close} />;
      case geofenceTypeSlug.paidParkingCircle:
        return <PaidParking close={close} />;
      case geofenceTypeSlug.notScooters:
        return <ScooterBanZone close={close} />;
      case geofenceTypeSlug.speedLimitSchedule:
        return <SpeedControlTime close={close} />;
      case geofenceTypeSlug.outOfZone:
        return <OutOfZone close={close} />;
    }
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [presented, setPresented] = useState(false);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand();
    setPresented(true);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setPresented(false);
    }
  }, []);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => {
  //       if (bottomSheetModalRef.current && presented) {
  //         bottomSheetModalRef.current.close();
  //         setPresented(false);
  //         return true;
  //       }
  //       if (!presented) {
  //         return false;
  //       } else {
  //         BackHandler.exitApp();
  //         return false;
  //       }
  //     }
  //   );

  //   return () => backHandler.remove();
  // }, [presented]);

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  return (
    <View style={gStyles.container}>
      <View style={{ height: "100%" }}>
        {/* <ImageBackground
            style={styles.imgBackground}
            resizeMode="cover"
            source={require("../assets/images/draft/bcg-img-map.png")}
          ></ImageBackground> */}

        <GestureHandlerRootView>
          <View style={{ height: "100%" }}>
            {/* Карта */}
            {location && <Map location={location} />}

            {/* <TouchableOpacity 
              // style={gStyles.scootMarkerContainer}
              style={gStyles.scootMarkerContainerActive}
              >
              
              <View style={gStyles.scootMarkerBox}>
                <Shadow
                // {...ShadowMarkerPassive.marker}
                {...ShadowMarkerActive.marker}
                >

                <View 
                  // style={gStyles.scootMarkerArea}
                  style={gStyles.scootMarkerAreaActive}
                >
                  <View 
                    // style={gStyles.svgBattaryRadius}
                    style={gStyles.svgBattaryRadiusActive}
                    >
                    <Svg rotation={90} 
                    // width="100%" height="100%"
                    // width="100" height="100"
                    // style={{position: 'relative', 
                    // display: 'flex',alignItems: 'center', justifyContent: 'center',
                  // }}
                    >
                      <Circle

                      // Параметры если НЕ активна
                        // cx="17"
                        // cy="17"
                        // r="14"
                        // strokeWidth="3"

                      // // Параметры если Активна 
                        cx="20"
                        cy="20"
                        r="16"
                        strokeWidth="4"


                        stroke="#10F442"
                        strokeDasharray={calculateStrokeDasharray()}
                        fill="transparent"
                      />
                    </Svg>
                  </View>
                  <View 
                    // style={gStyles.scootMarkerWrapper}
                    style={gStyles.scootMarkerWrapperActive}
                    >
                    <Image
                      style={gStyles.scootMarkerIcon}
                      source={require("../assets/images/zone-in-map/scoot-marker-icon-2.png")}
                    />
                  </View>
                </View>
                </Shadow>

                
                <View 
                  // style={gStyles.parkingMapArrowDown}
                  style={gStyles.parkingMapArrowDownActive}
                  >
                </View>
              </View>
              
              <Shadow {...ShadowMarkerCircle.marker}>
                <View style={gStyles.parkingMapCircle}></View>
              </Shadow>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={gStyles.roadSignMapBox} onPress={open}>
              <Image
                style={gStyles.roadSignMap}
                source={require("../assets/images/zone-in-map/parking.png")}
              />
            </TouchableOpacity> 

            

            {/* Парковка интерактивная со списком самокатов */}

            {/* <Pressable style={gStyles.parkingMapContainer} onPress={open}>
              <View style={gStyles.parkingMapBox}>
                <View style={gStyles.parkingMapWrapper}>
                  <Image
                    style={gStyles.parkingMapIcon}
                    source={require("../assets/images/zone-in-map/parking.png")}
                  />
                  <Text style={gStyles.parkingMapCountScoot}>24</Text>
                </View>
                <View style={gStyles.parkingMapArrowDown}></View>
              </View>
            </Pressable> */}
            {/* end Парковка интерактивная со списком самокатов */}

            {/* Маркер одного Cамоката */}
            {/* <TouchableOpacity
              style={gStyles.scootMarkerContainer}
              onPress={open}
            >
              <View style={gStyles.scootMarkerBox}>
                <View style={gStyles.scootMarkerArea}>
                  <View style={gStyles.scootMarkerWrapper}>
                    <Image
                      style={gStyles.scootMarkerIcon}
                      source={require("../assets/images/zone-in-map/scoot-marker-icon.png")}
                    />
                  </View>
                </View>

                <View style={gStyles.parkingMapArrowDown}></View>
              </View>
              <View style={gStyles.parkingMapCircle}></View>
            </TouchableOpacity> */}
            {/* end Маркер одного самоката */}

            <BottomMenu open={openBottomSheetMenu} />

            <TripProcess closeScooterBottomSheet={closeScooterBottomSheet} />

            {/* <TripProcess /> */}

            <TouchableOpacity
              style={{ top: 100, right: 10, position: "absolute" }}
            >
              <Image
                style={{ width: 84 }}
                source={require("../../assets/images/logo-pass.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* <View style={{ top: 100, position: "absolute" }}>
              <Button
                title="Авторизация"
                onPress={() => router.push("/(public)/auth")}
              />
              <Button
                title="Подтверждение"
                onPress={() => router.push("/(public)/confirm")}
              />
              <Button title="Head" onPress={() => router.push("/head/")} />
              <Button
                title="Еще страница"
                onPress={() => router.push("/head/blank")}
              />
            </View> */}

            <Modal
              coverScreen={false}
              isVisible={qrCameraIsVisible}
              style={{ margin: 0 }}
              onBackButtonPress={() => setIsQrCameraVisible(false)}
            >
              <MainCamera
                closeScooterBottomSheet={closeScooterBottomSheetWithoutEffect}
                openScooterBottomSheet={openScooterBottomSheet}
              />
            </Modal>

            <BottomSheet
              containerStyle={{
                marginTop: insets.top,
                zIndex: 1000,
              }}
              ref={scooterBottomSheetRef}
              index={-1}
              onClose={closeScooterBottomSheet}
              // snapPoints={snapPoints}
              enableDynamicSizing={true}
              snapPoints={[1]}
              // maxDynamicContentSize={100}
              enablePanDownToClose={true}
              handleIndicatorStyle={{
                backgroundColor: "#CACACA",
                width: 36,
                height: 4,
              }}
              handleHeight={0}
              backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
              handleStyle={{ padding: 6 }}

              // handleStyle={{ display: "none" }}
            >
              <BottomSheetScrollView>
                <ScooterInSheet />
              </BottomSheetScrollView>
            </BottomSheet>

            <BottomSheet
              containerStyle={{
                marginTop: insets.top,
              }}
              ref={bottomSheetMenuRef}
              index={-1}
              // snapPoints={snapPoints}
              enableDynamicSizing={true}
              // maxDynamicContentSize={100}
              enablePanDownToClose={true}
              handleIndicatorStyle={{
                backgroundColor: "#CACACA",
                width: 36,
                height: 4,
              }}
              handleHeight={0}
              backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
              handleStyle={{ padding: 6 }}
              // handleStyle={{ display: "none" }}
            >
              <BottomSheetScrollView>
                <Menu
                  openInfoSheet={openInfoBottomSheet}
                  closeInfoSheet={closeInfoSheet}
                />
              </BottomSheetScrollView>
            </BottomSheet>
            {/* Юридическая информация */}

            <BottomSheet
              containerStyle={{
                // marginTop: insets.top,
                backgroundColor: isInfoExpand
                  ? "rgba(0, 0, 0, 0.5)"
                  : "rgba(0, 0, 0, 0.0)",
              }}
              ref={infoBottomSheetRef}
              index={-1}
              // snapPoints={snapPoints}
              enableDynamicSizing={true}
              // maxDynamicContentSize={100}
              enablePanDownToClose={true}
              handleIndicatorStyle={{
                backgroundColor: "#CACACA",
                width: 36,
                height: 4,
              }}
              onClose={closeInfoSheet}
              handleHeight={0}
              backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
              handleStyle={{ padding: 6 }}
              // handleStyle={{ display: "none" }}
            >
              <BottomSheetScrollView>
                <View style={gStyles.pageProfileSection}>
                  <TouchableOpacity
                    style={gStyles.pageProfileOneItem}
                    onPress={() => router.push("/(app)/profile/agreement")}
                  >
                    <View style={gStyles.pageProfileUserItemData}>
                      <Text style={gStyles.pagePName}>
                        Договор о присоединении
                      </Text>
                    </View>
                    <Image
                      style={gStyles.pageProfileIconArrow}
                      source={require("../../assets/images/arrow-upward.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={gStyles.pageProfileSection}>
                  <TouchableOpacity
                    style={gStyles.pageProfileOneItem}
                    onPress={() => router.push("/(app)/profile/politics")}
                  >
                    <View style={gStyles.pageProfileUserItemData}>
                      <Text style={gStyles.pagePName}>
                        Политика конфиденциальности
                      </Text>
                    </View>
                    <Image
                      style={gStyles.pageProfileIconArrow}
                      source={require("../../assets/images/arrow-upward.png")}
                    />
                  </TouchableOpacity>
                </View>
              </BottomSheetScrollView>
            </BottomSheet>

            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              containerStyle={{
                marginTop: insets.top,
                marginBottom: insets.bottom,
              }}
              // snapPoints={snapPoints}
              enableDynamicSizing={true}
              // maxDynamicContentSize={100}
              enablePanDownToClose={true}
              handleIndicatorStyle={{ backgroundColor: "#CACACA" }}
              handleHeight={0}
              backgroundStyle={{ backgroundColor: "#F2E7E7" }}
              // backgroundStyle={{ backgroundColor: "#fff" }}
              handleStyle={{ display: "none" }}
              onClose={() => setGeofenceType(null)}
            >
              <BottomSheetScrollView>
                {setBottomSheetComponent()}
              </BottomSheetScrollView>
            </BottomSheet>
          </View>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

// Тени
const ShadowMarkerPassive = {
  marker: {
    distance: 2,
    startColor: "#00000020",
    offset: [0, 1],
  } as ShadowProps,
};
const ShadowMarkerActive = {
  marker: {
    distance: 3,
    startColor: "#00000020",
    offset: [0, 2],
  } as ShadowProps,
};
const ShadowMarkerCircle = {
  marker: {
    distance: 2,
    startColor: "#00000020",
    offset: [0, 0],
  } as ShadowProps,
};

const styles = StyleSheet.create({
  // Стили тут

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Фон картинка карты
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
  },
});

export default Page;

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }

  if (data) {
    const location = useLocationStore.getState();
    const { locations }: any = data;
    let coordObj: LocationObject = locations[0];

    const time = new Date(locations[0].timestamp).toDateString();
    console.log(time);
    location.setLocationAsync(coordObj);
  }
});

// TaskManager.defineTask(START_GEOFENCING, async ({ data, error }: any) => {
//   if (error) {
//     console.log("GEOFENCING_TRACKING task ERROR:", error);
//     return;
//   }

//   if (data) {
//     const location = useLocationStore.getState();
//     location.setGeofencingEventType(data.region.state);
//     console.log("GEOFENCING ASYNC DATA");
//     console.log(data);
//   }
// });
