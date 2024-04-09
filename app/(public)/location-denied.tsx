import { useLocation } from "@/hooks/use-location";
import { useEffect, useState } from "react";
import { View, Text, Button, Linking, Platform, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useGps } from "@/hooks/use-gps";
import mzStyles from "@/styles/mod-zone-style";

export default function LocationDenied() {
  // useGps();

  const [status, setStatus] = useState<string>();
  const [beInSettings, setBeInSettings] = useState(false);

  const checkStatusGps = async () => {
    const isGpsEnabled = await Location.hasServicesEnabledAsync();
    return isGpsEnabled;
  };

  useEffect(() => {
    if (!beInSettings) return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      // if (status === "granted") {
      //   router.replace("/(app)");
      // }

      setStatus(status);
      setBeInSettings(false);
    })();
  }, [beInSettings]);

  // const accessAppGeoPermissions = async () => {
  //   let { status } = await Location.getForegroundPermissionsAsync();
  //   return status;
  //   router.replace("/(app)");
  // };

  const goToSettings = async () => {
    const settingsUrl = Platform.OS === "ios" ? "app-settings:" : "location";
    const statusGps = await checkStatusGps();
    // const permissonStatus = await accessAppGeoPermissions();
    if (!statusGps) {
      Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
      return;
    }

    if (status === "granted" && statusGps) {
      router.replace("/(app)");
      return;
    }

    if (status !== "granted") {
      Linking.openSettings();
      setBeInSettings(true);
      return;
    }
    router.replace("/(app)");
  };

  return (
    <>
      <View style={styles.notGeoContainer}>
        <Image
          style={styles.notGeoImg}
          source={require("../../assets/images/not-geo.png")}
          resizeMode="contain"
        />
        <Text style={styles.notGeoTitle}>Включите геопозицию</Text>
        <Text style={styles.notGeoDesc}>Без включенной геопозиции, приложение будет работать некорректно</Text>
      </View>
      <View style={[mzStyles.BtnBox, styles.notGeoBtnDownPos]}>
        <TouchableOpacity style={mzStyles.BtnOk} onPress={() => goToSettings()}>
          <Text style={mzStyles.BtnOkTxt}>Включить</Text>
        </TouchableOpacity>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
notGeoContainer: {
  backgroundColor: '#fff',
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
  paddingLeft: 20,
  paddingRight: 20,
  // paddingTop: 8,
  // paddingBottom: 20,
  // borderTopRightRadius: 28,
  // borderTopLeftRadius: 28,
},
notGeoImg:{
  width: 200,
  height: 110,
},
notGeoTitle: {
  color: "#000",
  fontSize: 24,
  lineHeight: 28,
  fontWeight: "700",
  textAlign: "center",
},
notGeoDesc: {
  color: "#000",
  fontSize: 16,
  lineHeight: 20,
  fontWeight: "400",
  textAlign: "center",
},
notGeoBtnDownPos:{
  position: 'absolute',
  bottom: 0,
},
});