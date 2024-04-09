import React, { useState, useEffect, FC } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import mzStyles from "../../../styles/mod-zone-style";
import { useGeofenceStore } from "@/stores/geofence-store";

type Props = {
  close: () => void;
};

const SpeedControl: FC<Props> = ({ close }) => {
  const { selectedGeofence } = useGeofenceStore();


  const setSpeedControlIcon = () => {
    switch (selectedGeofence?.allTimeSpeedLimit) {
      case 5:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control/5.png")}
          />
        );
      case 10:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control/10.png")}
          />
        );
      case 15:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control/15.png")}
          />
        );
      case 20:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control/20.png")}
          />
        );
      default:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control/5.png")}
          />
        );
    }
  };

  return (
    <>
      {/* Предложение для первой поездки-Настройка */}
      <View style={mzStyles.mzContainer}>
        <View style={mzStyles.mzBoxOne}>
          <View style={mzStyles.mzWrapperOne}>
            <View style={mzStyles.lineModSwipe}></View>
            <View style={mzStyles.ZoneModHeadBox}>
              {setSpeedControlIcon()}
              <Text style={mzStyles.h5Headung}>Зона контроля скорости</Text>
              <Text style={mzStyles.subTitle}>Круглосуточно</Text>
            </View>
            <View style={mzStyles.ZoneModDescrBox}>
              <Image
                style={mzStyles.ModIconInfo}
                source={require("../../../assets/images/info-modal.png")}
              />
              <View style={mzStyles.ZnakModIconTxt}>
                <Text style={mzStyles.subTitleAlertDesc}>
                  Скорость самоката автоматически снизится. Так безопаснее для
                  всех
                </Text>
              </View>
            </View>
          </View>

          <View style={mzStyles.BtnBox}>
            <Pressable style={mzStyles.BtnOk} onPress={close}>
              <Text style={mzStyles.BtnOkTxt}>Хорошо!</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default SpeedControl;
