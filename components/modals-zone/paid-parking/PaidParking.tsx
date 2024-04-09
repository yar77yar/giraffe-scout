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

const PaidParking: FC<Props> = ({ close }) => {
  const { selectedGeofence } = useGeofenceStore();

  return (
    <>
      {/* Предложение для первой поездки-Настройка */}
      <View style={mzStyles.mzContainer}>
        <View style={mzStyles.mzWrapperOne}>
          <View style={mzStyles.lineModSwipe}></View>
          <View style={mzStyles.ZoneModHeadBox}>
            <Image
              style={mzStyles.ZnakModIcon}
              source={require("../../../assets/images/zone-in-modal/paid-parking.png")}
            />
            <Text style={mzStyles.h5Headung}>Платная парковка</Text>
            <Text style={mzStyles.subTitle}>Круглосуточно</Text>
          </View>
          <View style={mzStyles.ZoneModDescrBox}>
            <Image
              style={mzStyles.ModIconInfo}
              source={require("../../../assets/images/info-modal.png")}
            />
            <View style={mzStyles.ZnakModIconTxt}>
              <Text style={mzStyles.subTitleAlertDesc}>
                Здесь нельзя парковаться и оставлять самокаты, даже не надолго
              </Text>
            </View>
          </View>
        </View>

        <View style={mzStyles.mzWrapperTwo}>
          <View style={mzStyles.addValueZone}>
            <Text style={mzStyles.addValueZoneTitle}>Стоимость</Text>
            <Text>{selectedGeofence?.type.parkingPrice} Р</Text>
          </View>

          {/* Кнопка */}
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

export default PaidParking;
