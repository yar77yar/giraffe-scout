import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  FlashMode,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCameraStore } from "@/stores/camera-store";
import Button from "@/components/main-camera/ui/Button";
import { buttonSelectors } from "@/components/main-camera/buttonSelectorEnum";
import { Fontisto } from "@expo/vector-icons";
import tripService from "@/services/trip.service";
import { useTripProcessStore } from "@/stores/trip-process.store";
import request from "axios";

type Props = {
  handleTripEnd: () => void;
};

export default function EndTripCamera({ handleTripEnd }: Props) {
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.on);
  const [permission, setPermission] = useState<boolean | null>(false);

  const [previewPricture, setPreviewPicture] =
    useState<CameraCapturedPicture>();

  const cameraRef = useRef<Camera>(null);

  const { selectedTripToEnd } = useTripProcessStore();

  const { setIsCameraVisible } = useCameraStore();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  console.log(selectedTripToEnd);

  const takePictureAsync = async () => {
    const picture = await cameraRef.current?.takePictureAsync({
      base64: true,
      quality: 0,
    });
    setPreviewPicture(picture);
    console.log(picture);
  };

  const saveTripPicture = async () => {
    if (!previewPricture) return;
    if (!previewPricture.base64) return;
    if (!selectedTripToEnd) return;

    try {
      const picture = previewPricture.base64.replaceAll(" ", "+");

      const res = await tripService.savePhoto(
        `data:image/jpg;base64,${picture}`,
        selectedTripToEnd.tripInfo.id
      );
      setTimeout(() => {
        handleTripEnd();
      }, 1000);
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
      }
      Alert.alert("Ошибка трансфера изображения");
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        ratio="16:9"
        style={styles.camera}
        flashMode={flash}
        ref={cameraRef}
      >
        <View style={{ ...styles.cameraPanelTop, marginTop: insets.top }}>
          <Button
            iconSize={36}
            selector={buttonSelectors.CLOSE}
            icon={"close-outline"}
            // onPress={() => router.back()}
            onPress={() => setIsCameraVisible(false)}
          />
        </View>

        <View style={styles.cameraScannerBox}>
          <View style={styles.cameraScannerTitleBox}>
            <Text style={styles.cameraScannerTitle}>
              Сфотографируйте самокат
            </Text>
          </View>
          <Image
            style={styles.cameraIconScanner}
            source={require("../../../assets/images/camera/scanner.png")}
          />
        </View>
        {/* Нижняя панель */}
        <View style={styles.panel}>
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
          <Fontisto
            name="record"
            size={54}
            color="white"
            onPress={() => takePictureAsync()}
          />

          {previewPricture && (
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => saveTripPicture()}
            >
              <Text style={{ color: "#fff" }}>Готово</Text>
            </TouchableOpacity>
          )}
        </View>
      </Camera>

      {previewPricture && (
        <Image
          source={{ uri: previewPricture.uri }}
          style={styles.previewPicture}
        />
      )}
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
  previewPicture: {
    position: "absolute",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: 'center',
    // gap: 32,
    // paddingLeft: 20,
    // paddingRight: 20,
    height: 160,
    width: 140,
    bottom: 70,
    left: 10,
    right: 0,
    marginBottom: 30,
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
  doneButton: {
    height: 60,
    width: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#25222280',
    // backgroundColor: '#FDDA30',
    borderRadius: 200,
    borderColor: "#ffffff30",
    borderWidth: 1,
  },
});
