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

const SpeedControlTime: FC<Props> = ({ close }) => {
  const { selectedGeofence } = useGeofenceStore();

  const [currentInterval, setCurrentInterval] = useState(
    selectedGeofence?.currentSpeedLimit
  );

  const setSpeedControlIcon = () => {
    const speedLimit =
      currentInterval === "firstInterval"
        ? selectedGeofence?.firstSpeedLimit
        : "secondInterval"
        ? selectedGeofence?.secondSpeedLimit
        : null;

    if (!speedLimit) return;

    switch (speedLimit) {
      case 5:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control-time/5.png")}
          />
        );
      case 10:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control-time/10.png")}
          />
        );
      case 15:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control-time/15.png")}
          />
        );
      case 20:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control-time/20.png")}
          />
        );
      case 25:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control-time/25.png")}
          />
        );
      default:
        return (
          <Image
            style={mzStyles.ZnakModIcon}
            source={require("../../../assets/images/zone-in-map/speed-control-time/5.png")}
          />
        );
    }
  };

  function handleStringDateSplit(value: string | null | undefined) {
    if (!value) return "date error";
    const defaultStringArr = value.split(":");
    return `${defaultStringArr[0]}:${defaultStringArr[1]}`;
  }

  return (
    <>
      {/* Предложение для первой поездки-Настройка */}
      <View style={mzStyles.mzContainer}>
        <View style={mzStyles.mzWrapperOne}>
          <View style={mzStyles.lineModSwipe}></View>
          <View style={mzStyles.ZoneModHeadBox}>
            {currentInterval === "noInterval" ? (
              <Image
                style={mzStyles.ZnakModIcon}
                source={require("../../../assets/images/zone-in-map/speed-control-time/25.png")}
              />
            ) : (
              setSpeedControlIcon()
            )}
            <Text style={mzStyles.h5Headung}>Зона контроля скорости</Text>
            <Text style={mzStyles.subTitle}>По расписанию</Text>
          </View>
          <View style={mzStyles.ZoneModDescrBox}>
            <Image
              style={mzStyles.ModIconInfo}
              source={require("../../../assets/images/info-modal.png")}
            />
            <View style={mzStyles.ZnakModIconTxt}>
              {currentInterval === "noInterval" ? (
                <Text style={mzStyles.subTitle}>
                  Сейчас нет никаких ограничений, скорость самоката не
                  измениться
                </Text>
              ) : (
                <Text style={mzStyles.subTitle}>
                  Скорость самоката снизится автоматически, так безопаснее для
                  всех
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={mzStyles.mzWrapperTwo}>
          <View style={mzStyles.addValueZone}>
            <Text style={mzStyles.addValueZoneTitle}>Расписание </Text>
            <View style={mzStyles.scValueBox}>
              <View style={mzStyles.scValueTime}>
                <Text
                  style={
                    currentInterval === "firstInterval"
                      ? mzStyles.scValueTimeTxtActive
                      : mzStyles.scValueTimeTxt
                  }
                >
                  {`${handleStringDateSplit(
                    selectedGeofence?.firtsTimePeriodStart
                  )} - ${handleStringDateSplit(
                    selectedGeofence?.firstTimePeriodEnd
                  )}`}
                </Text>
                <Text
                  style={
                    currentInterval === "firstInterval"
                      ? mzStyles.scValueTimeTxtActive
                      : mzStyles.scValueTimeTxt
                  }
                >
                  до {selectedGeofence?.firstSpeedLimit} км/ч
                </Text>
              </View>
              <View style={mzStyles.scValueTime}>
                <Text
                  style={
                    currentInterval === "secondInterval"
                      ? mzStyles.scValueTimeTxtActive
                      : mzStyles.scValueTimeTxt
                  }
                >
                  {`${handleStringDateSplit(
                    selectedGeofence?.secondTimePeriodStart
                  )} - ${handleStringDateSplit(
                    selectedGeofence?.secondTimePeriodEnd
                  )}`}
                </Text>
                <Text
                  style={
                    currentInterval === "secondInterval"
                      ? mzStyles.scValueTimeTxtActive
                      : mzStyles.scValueTimeTxt
                  }
                >
                  до {selectedGeofence?.secondSpeedLimit} км/ч
                </Text>
              </View>
            </View>
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

export default SpeedControlTime;
