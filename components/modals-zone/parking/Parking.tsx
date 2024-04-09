import React, { useState, useEffect, FC } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import mzStyles from "../../../styles/mod-zone-style";
import gStyles from "../../../styles/style";
import { useGeofenceStore } from "@/stores/geofence-store";
import { useScooterStore } from "@/stores/scooter-store";
import { IScooter } from "@/interfaces/scooter/scooter.interface";

type Props = {
  close: () => void;
};

const Parking: FC<Props> = ({ close }) => {
  const selectedGeofence = useGeofenceStore((store) => store.selectedGeofence);
  const scooters = useScooterStore((state) => state.scooters);

  function scootersData() {
    const scootersData = [];

    if (!selectedGeofence) {
      return;
    }

    if (selectedGeofence.scooters.length === 0) {
      return;
    }

    if (!scooters) {
      return;
    }

    for (const geofenceScooter of selectedGeofence.scooters) {
      for (const scooter of scooters) {
        if (geofenceScooter.scooterId === scooter.scooter.id) {
          scootersData.push(scooter);
        }
      }
    }
    return scootersData;
  }

  const scootersToRender = scootersData();

  // const rightechScooterData = (scooter: IScooter) => {
  //   if (!scooters) return null;

  //   return scooters?.rightechScooters.find((x) => x.id === scooter.deviceId);
  // };

  return (
    <>
      {/* Предложение для первой поездки-Настройка */}
      <View style={mzStyles.mzContainer}>
        <View style={mzStyles.mzWrapperOne}>
          <View style={mzStyles.lineModSwipe}></View>
          <View style={mzStyles.ZoneModHeadBox}>
            <Image
              style={mzStyles.ZnakModIcon}
              source={require("../../../assets/images/zone-in-modal/parking.png")}
            />
            <Text style={mzStyles.h5Headung}>Парковка</Text>
            <Text style={mzStyles.subTitle}>
              Здесь начинают и завершают аренду
            </Text>
          </View>
          <View style={mzStyles.ZoneModDescrBox}>
            <Image
              style={mzStyles.ModIconInfo}
              source={require("../../../assets/images/adres-modal.png")}
            />
            <View style={mzStyles.ZnakModIconTxt}>
              <Text style={mzStyles.subTitleAlertDesc}>
                {selectedGeofence?.address}
              </Text>
            </View>
          </View>
        </View>

        <View style={mzStyles.mzWrapperTwo}>
          {/* Градиент проба */}
          {/* <View style={styles.container}>
            <LinearGradient
              colors={['#3ecaf6', 'rgba(62, 202, 246, 0.65)', '#3ecaf6']}
              style={styles.gradientBackground}
            >
              <View style={styles.linearGradient} />
            </LinearGradient>
          </View> */}
          <View style={mzStyles.addValueZone}>
            <Text style={mzStyles.addValueZoneTitle}>
              Самокаты {selectedGeofence?.scooters.length}
            </Text>
            {/* <Text>50 Р</Text> */}
          </View>

          <View style={gStyles.scootListContainer}>
            {scootersToRender?.map((scooter) => (
              <View style={gStyles.scootListItem} key={scooter.scooter.id}>
                <View style={gStyles.sLIBoxOne}>
                  <View style={gStyles.sLIImageWrap}>
                    <Image
                      style={gStyles.sLIImageScoot}
                      source={require("../../../assets/images/scooters/scooter-cover.png")}
                    />
                    <Image
                      style={gStyles.sLIImageScootBack}
                      source={require("../../../assets/images/scooters/circle-scoot-back.png")}
                    />
                  </View>
                  <View style={gStyles.sLIInfoWrap}>
                    <Text style={gStyles.sLIModelTxt}>
                      {scooter.scooter.model.modelName}
                    </Text>
                    <View style={gStyles.sLIqr}>
                      <Image
                        style={gStyles.sLIqrIcon}
                        source={require("../../../assets/images/scooters/qr-mini-card.png")}
                      />
                      <Text style={gStyles.sLIqrTxt}>
                        {scooter.scooter.deviceId}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={gStyles.sLIBoxTwo}>
                  <View style={gStyles.sLIChargeBox}>
                    <View style={gStyles.sLILevelBox}></View>
                    {/* <View style={gStyles.innerShadowContent}> 
                              </View> */}
                    <View style={gStyles.sLILevelIcTxtBox}>
                      <Image
                        style={gStyles.sLILightIcon}
                        source={require("../../../assets/images/scooters/light.png")}
                      />
                      <Text>
                        {Math.floor(Number(scooter.rightechScooter?.state.charge))}%
                      </Text>
                    </View>
                  </View>
                  {/* <Text>
                    {Math.floor(Number(scooter.rightechScooter?.state.charge))}%
                  </Text> */}
                </View>
              </View>
            ))}
          </View>

          {/* Кнопка */}
          {/* <View style={mzStyles.BtnBox}>
            <Pressable style={mzStyles.BtnOk}>
              <Text style={mzStyles.BtnOkTxt}>Хорошо!</Text>
            </Pressable>
          </View> */}
        </View>
      </View>
    </>
  );
};

// Тени
const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 230,
    shadowColor: "rgba(55, 50, 50, 0.07)",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 12,
    shadowRadius: 0,
    elevation: 2, // For Android
    backgroundColor: "#7adbf9",
    borderRadius: 8, // Adjust as needed
    margin: 10, // Adjust as needed
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 8, // Adjust as needed
    overflow: "hidden",
  },
  linearGradient: {
    flex: 1,
    borderRadius: 8, // Adjust as needed
  },
});

export default Parking;
