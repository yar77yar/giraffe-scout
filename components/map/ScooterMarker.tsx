import React, { FC, Fragment } from "react";
import { View, TouchableOpacity, Image, Pressable } from "react-native";
import gStyles from "@/styles/style";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import { Marker } from "react-native-maps";
import {
  IRightechScooter,
  IScooter,
  IScooterData,
} from "@/interfaces/scooter/scooter.interface";
import { SelectedScooter, useScooterStore } from "@/stores/scooter-store";
import { IGeofence } from "@/interfaces/geofence/geofence.interface";

type Props = {
  scooter: IScooterData;
  geofences: IGeofence[];
  zoom: number;
};

const ScooterMarker: FC<Props> = ({ scooter, geofences, zoom }) => {
  const { setSelectedScooter, selectedScooter: storeScooter } =
    useScooterStore();

  const selectedScooter =
    storeScooter && storeScooter.scooter.id === scooter.scooter.id;

  const setStoreScooter = () => {
    setSelectedScooter(scooter);
  };

  const chargePercentage = Math.floor(
    scooter.rightechScooter?.state?.charge || 100
  );

  const radius = selectedScooter ? 16 : 14;

  const calculateStrokeDasharray = () => {
    const circumference = 2 * Math.PI * radius;
    const dashArray = (circumference * chargePercentage) / 100;
    return `${dashArray} ${circumference}`;
  };

  if (!scooter) {
    return null;
  }

  if (!scooter.rightechScooter.state) {
    return null;
  }

  if (
    !scooter.rightechScooter.state.lat ||
    !scooter.rightechScooter.state.lon
  ) {
    return null;
  }

  const isScooterInParkingZone = geofences.some(
    (zone) =>
      zone.scooters.length > 0 &&
      zone.scooters.some((x) => x.scooterId === scooter.scooter.id)
  );

  if (isScooterInParkingZone) {
    return null;
  }

  const shadowProps = !selectedScooter
    ? ShadowMarkerPassive.marker
    : ShadowMarkerActive.marker;

  const circleStyles = {
    cx: selectedScooter ? "20" : "17",
    cy: selectedScooter ? "20" : "17",
    r: selectedScooter ? "16" : "14",
    strokeWidth: selectedScooter ? "4" : "3",
  };

  return (
    <Marker
      coordinate={{
        latitude: scooter.rightechScooter.state.lat,
        longitude: scooter.rightechScooter.state.lon,
      }}
      icon={undefined}
      opacity={zoom >= 13 ? 1 : 0}
      onPress={() => setStoreScooter()}
      // tracksViewChanges={false}
    >
      <Pressable
        style={
          selectedScooter
            ? gStyles.scootMarkerContainerActive
            : gStyles.scootMarkerContainer
        }
      >
        <View style={gStyles.scootMarkerBox}>
          <Shadow {...shadowProps}>
            <View
              style={
                selectedScooter
                  ? gStyles.scootMarkerAreaActive
                  : gStyles.scootMarkerArea
              }
            >
              <View
                style={
                  selectedScooter
                    ? gStyles.svgBattaryRadiusActive
                    : gStyles.svgBattaryRadius
                }
              >
                <Svg
                  rotation={90}
                  // width="100%" height="100%"
                  // width="100" height="100"
                  // style={{position: 'relative',
                  // display: 'flex',alignItems: 'center', justifyContent: 'center',
                  // }}
                >
                  <Circle
                    cx={circleStyles.cx}
                    cy={circleStyles.cy}
                    r={circleStyles.r}
                    strokeWidth={circleStyles.strokeWidth}
                    stroke="#10F442"
                    strokeDasharray={calculateStrokeDasharray()}
                    fill="transparent"
                  />
                </Svg>
              </View>
              <View
                style={
                  selectedScooter
                    ? gStyles.scootMarkerWrapperActive
                    : gStyles.scootMarkerWrapper
                }
              >
                <Image
                  style={gStyles.scootMarkerIcon}
                  source={require("../../assets/images/zone-in-map/scoot-marker-icon-2.png")}
                />
              </View>
            </View>
          </Shadow>

          <View
            style={
              selectedScooter
                ? gStyles.parkingMapArrowDownActive
                : gStyles.parkingMapArrowDown
            }
          ></View>
        </View>

        {selectedScooter ? (
          <Shadow {...ShadowMarkerCircle.marker}>
            <View style={gStyles.parkingMapCircle}></View>
          </Shadow>
        ) : null}
      </Pressable>
    </Marker>
  );
};

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

export default React.memo(ScooterMarker);
