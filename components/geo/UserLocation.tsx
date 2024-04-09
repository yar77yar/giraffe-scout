import gStyles from "@/styles/style";
import { LocationObject } from "expo-location";
import React, { FC, Fragment } from "react";
import { Pressable, View, Image, Text } from "react-native";
import { Circle, Marker } from "react-native-maps";
import { Shadow, ShadowProps } from "react-native-shadow-2";

type Props = {
  location: LocationObject;
};

const parkingStyleWrapper = gStyles.parkingMapWrapper;

const parkingStyleContainer = gStyles.parkingMapContainer;

const parkingStyleArrowDown = gStyles.parkingMapArrowDown;

const UserLocation: FC<Props> = ({ location }) => {
  return location && location.coords.accuracy ? (
    <Fragment>
      <Circle
        center={location.coords}
        radius={location.coords.accuracy}
        fillColor="rgba(0, 0, 255, 0.2)"
        strokeColor="rgba(0, 0, 255, 0.2)"
      />
      <Marker
        coordinate={location.coords}
        icon={require("../../assets/images/geo.png")}
        anchor={{ x: 0.5, y: 0.5 }}
      />
    </Fragment>
  ) : null;
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

export default UserLocation;
