import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import gStyles from "@/styles/style";
import { buttonSelectors } from "./buttonSelectorEnum";
import { isCorrectScooterQr } from "@/utils/is-correct-scooter-qr";
import { useScooterStore } from "@/stores/scooter-store";
import { useCameraStore } from "@/stores/camera-store";
import ScooterCodeScreen from "./ScooterCodeScreen";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

type Props = {
  closeScooterBottomSheet: () => void;
  openScooterBottomSheet: () => void;
};

export default function MainCamera(props: Props) {
  const { closeScooterBottomSheet, openScooterBottomSheet } = props;

  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.on);
  const [permission, setPermission] = useState<boolean | null>(false);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef<Camera>(null);

  const { scooters, setSelectedScooter, selectedScooter } = useScooterStore();

  const [isCodeModalVisible, setIsCodeModalVisible] = useState<boolean>(false);

  const codeRef = useRef<BottomSheet>(null);

  const openCodeSheet = () => {
    codeRef.current?.expand();
    if (selectedScooter) {
      closeScooterBottomSheet();
    }
    setIsCodeModalVisible(true);
  };
  const closeCodeSheet = () => {
    codeRef.current?.close();
    if (selectedScooter) {
      openScooterBottomSheet();
    }
    setIsCodeModalVisible(false);
  };

  const { setIsQrCameraVisible } = useCameraStore();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    Keyboard.dismiss();

    return () => Keyboard.dismiss();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    if (isCodeModalVisible) return;

    const isCorrect = isCorrectScooterQr(data);
    if (!isCorrect) {
      Alert.alert("Что-то интересное, но об этом мы не знаем =(");
      setScanned(true);
      return;
    }
    const scooter = scooters?.find((x) => x.scooter.deviceId === data);

    if (!scooter) {
      Alert.alert("Такой скутер не найден!");
      setScanned(true);
      return;
    }

    // Alert.alert(JSON.stringify(scooter));
    // router.back();
    setSelectedScooter(scooter, "QR");
    setScanned(true);
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  // if (!permission) {
  //   return <Text
  //     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //   >
  //     Нет доступа к камере
  //   </Text>
  // }

  const handleSetCodeModalVisible = (value: boolean) => {
    setIsCodeModalVisible(value);
  };

  console.log(isCodeModalVisible);

  return (
    <View style={styles.container}>
      {/* <Modal
        isVisible={isCodeModalVisible}
        style={{ margin: 0, width: "100%", height: "100%" }}
        coverScreen={false}
        onBackButtonPress={() => setIsCodeModalVisible(false)}
        swipeDirection={"down"}
        onSwipeComplete={() => setIsCodeModalVisible(false)}
      >
        <ScooterCodeScreen />
      </Modal> */}

      <BottomSheet
        containerStyle={{
          marginTop: insets.top,
          // position: "absolute",
          zIndex: 1500,
        }}
        ref={codeRef}
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
        onClose={() => {
          setIsCodeModalVisible(false);
          return;
        }}
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
          <ScooterCodeScreen closeCodeSheet={closeCodeSheet} />
        </BottomSheetScrollView>
      </BottomSheet>

      <Camera
        type={type}
        ratio="16:9"
        style={styles.camera}
        flashMode={flash}
        ref={cameraRef}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={{ ...styles.cameraPanelTop, marginTop: insets.top }}>
          <Button
            iconSize={36}
            selector={buttonSelectors.CLOSE}
            icon={"close-outline"}
            // onPress={() => router.back()}
            onPress={() => setIsQrCameraVisible(false)}
          />
        </View>

        <View style={styles.cameraScannerBox}>
          <View style={styles.cameraScannerTitleBox}>
            <Text style={styles.cameraScannerTitle}>
              Отсканируйте QR-код на руле
            </Text>
          </View>
          <Image
            style={styles.cameraIconScanner}
            source={require("../../assets/images/camera/scanner.png")}
          />
        </View>
        {/* Нижняя панель */}
        <View
          style={
            selectedScooter
              ? { ...styles.panel, marginBottom: 312 }
              : { ...styles.panel }
          }
        >
          <TouchableOpacity style={styles.cameraBtnNum} onPress={openCodeSheet}>
            <Image
              style={styles.cameraIconKeyboard}
              source={require("../../assets/images/camera/keyboard.png")}
            />
            <Text style={styles.cameraBtnNumTxt}>Ввести номер</Text>
          </TouchableOpacity>

          <Button
            iconSize={28}
            icon={"flash-sharp"}
            color={flash === FlashMode.on ? "#fff" : "#000"}
            backgroundColor={
              flash === FlashMode.torch ? "#FDDA30" : "#25222280"
            }
            onPress={() => {
              setFlash(flash === FlashMode.on ? FlashMode.torch : FlashMode.on);
            }}
          />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  panel: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center',
    gap: 32,
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 30,
    backgroundColor: "none",
  },
  cameraBtnNum: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#25222280",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    borderColor: "#ffffff30",
    borderWidth: 1,
  },
  cameraBtnNumTxt: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
  },
  cameraIconKeyboard: {
    width: 24,
    height: 24,
  },
  cameraPanelTop: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    // top: 50,
    left: 0,
    right: 0,
    marginBottom: 40,
    // backgroundColor: "#000",
  },
  cameraScannerBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  cameraScannerTitleBox: {
    display: "flex",
    flexDirection: "row",
    // width: '100%',
    position: "absolute",
    top: "25%",
    zIndex: 2,
  },
  cameraScannerTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 24,
  },
  cameraIconScanner: {
    width: 208,
    height: 184,
  },
});
