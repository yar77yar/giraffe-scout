import React, { useState, useEffect, FC } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import gStyles from "../../styles/style";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useCameraStore } from "@/stores/camera-store";
import { useScooterStore } from "@/stores/scooter-store";

type Props = {
  open: () => void;
};

const BottomMenu: FC<Props> = ({ open }) => {
  const { setIsQrCameraVisible } = useCameraStore();

  const { selectedScooter } = useScooterStore();

  return (
    <>
      {/* Нижнее меню */}
      {/* <View>  */}

      <View style={gStyles.bottomMenu}>
        <ImageBackground
          style={gStyles.BackgroundBotMenu}
          resizeMode="stretch"
          source={require("../../assets/images/b-menu.png")}
        ></ImageBackground>

        <View style={gStyles.bottomMenuItemBox}>
          <TouchableOpacity style={gStyles.burgerBox} onPress={open}>
            <Image
              style={gStyles.burgerIcon}
              source={require("../../assets/images/burger-icon.png")}
            />
            <Text style={gStyles.burgerIconTitle}>Меню</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={gStyles.burgerBox}
            onPress={() => router.push("/(app)/guide")}
          >
            <Image
              style={gStyles.burgerIcon}
              source={require("../../assets/images/guide-icon.png")}
            />
            <Text style={gStyles.burgerIconTitle}>Гайд</Text>
          </TouchableOpacity>
        </View>

        <View style={gStyles.stock}>
          <TouchableOpacity
            style={gStyles.btnQR}
            // onPress={() => router.push("/(app)/camera")}
            onPress={() => setIsQrCameraVisible(true)}
          >
            <Image
              style={gStyles.btnQRIcon}
              source={require("../../assets/images/qr-icon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* </View> */}
    </>
  );
};

export default BottomMenu;
