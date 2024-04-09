import React from "react";
import { IGeofence } from "@/interfaces/geofence/geofence.interface";
import { FC, Fragment, useEffect, useState } from "react";
import { Polygon, Marker, Circle, Overlay } from "react-native-maps";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useGeofenceStore } from "@/stores/geofence-store";
import { geofenceTypeSlug } from "@/enums/geofenceTypesSlugEnum";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import gStyles from "@/styles/style";

type Props = {
  geofence: IGeofence;
  zoom: number;
};

type Coordinates = {
  lat: number;
  lng: number;
};

const CustomPolygon: FC<Props> = ({ geofence, zoom }) => {
  const { setGeofenceType, selectedGeofence } = useGeofenceStore();

  const coordinates: Coordinates[] =
    geofence.coordinates && geofence.type.drawType === "POLYGON"
      ? JSON.parse(geofence.coordinates)
      : null;

  const updatedCoordinates = coordinates
    ? coordinates.map((coord) => ({
        latitude: coord.lat,
        longitude: coord.lng,
      }))
    : null;

  const dashPattern =
    geofence.type.slug === "notParking" ||
    geofence.type.slug === "speedLimitAllDay"
      ? [5, 5, 5, 5]
      : undefined;

  const fillColor =
    geofence.type.slug === "mainZone"
      ? "rgba(255, 0, 0, 0.0)"
      : "rgba(255, 0, 0, 0.2)";

  const centerLat = updatedCoordinates
    ? updatedCoordinates.reduce((sum, point) => sum + point.latitude, 0) /
      updatedCoordinates.length
    : null;

  const centerLng = updatedCoordinates
    ? updatedCoordinates.reduce((sum, point) => sum + point.longitude, 0) /
      updatedCoordinates.length
    : null;

  const coordiantesCircle =
    geofence && geofence.coordinates && geofence.type.drawType === "CIRCLE"
      ? JSON.parse(geofence.coordinates)
      : null;

  const updatedCircleCoordinates = coordiantesCircle
    ? {
        latitude: coordiantesCircle.lat,
        longitude: coordiantesCircle.lng,
      }
    : null;

  const circleRadius =
    geofence && geofence.radius && geofence.type.drawType === "CIRCLE"
      ? geofence.radius
      : null;

  const markerCenterLat =
    geofence.type.drawType === "POLYGON"
      ? centerLat
      : updatedCircleCoordinates?.latitude;

  const markerCenterLng =
    geofence.type.drawType === "POLYGON"
      ? centerLng
      : updatedCircleCoordinates?.longitude;

  const setGeofenceSpeedLimitIcon = (
    limit: number,
    speedControlType: string
  ) => {
    switch (limit) {
      case 5:
        if (speedControlType === geofenceTypeSlug.speedLimitAllDay) {
          return require("../../assets/images/zone-in-map/speed-control/5.png");
        } else {
          return require("../../assets/images/zone-in-map/speed-control-time/5.png");
        }
      case 10:
        if (speedControlType === geofenceTypeSlug.speedLimitAllDay) {
          return require("../../assets/images/zone-in-map/speed-control/10.png");
        } else {
          return require("../../assets/images/zone-in-map/speed-control-time/10.png");
        }
      case 15:
        if (speedControlType === geofenceTypeSlug.speedLimitAllDay) {
          return require("../../assets/images/zone-in-map/speed-control/15.png");
        } else {
          return require("../../assets/images/zone-in-map/speed-control-time/15.png");
        }
      case 20:
        if (speedControlType === geofenceTypeSlug.speedLimitAllDay) {
          return require("../../assets/images/zone-in-map/speed-control/20.png");
        } else {
          return require("../../assets/images/zone-in-map/speed-control-time/20.png");
        }
      case 25:
        return require("../../assets/images/zone-in-map/speed-control-time/25.png");
    }
  };

  const setGeofenceIcon = () => {
    switch (geofence.type.slug) {
      case geofenceTypeSlug.speedLimitAllDay:
        return setGeofenceSpeedLimitIcon(
          geofence.allTimeSpeedLimit,
          geofence.type.slug
        );
      case geofenceTypeSlug.speedLimitSchedule:
        return setGeofenceSpeedLimitIcon(
          geofence.currentSpeedLimit === "firstInterval"
            ? geofence.firstSpeedLimit
            : geofence.currentSpeedLimit === "secondInterval"
            ? geofence.secondSpeedLimit
            : 25,
          geofence.type.slug
        );
      case geofenceTypeSlug.notParking:
        return require("../../assets/images/zone-in-map/no-parking.png");
      case geofenceTypeSlug.parkingCircle:
        return require("../../assets/images/zone-in-map/parking.png");
      case geofenceTypeSlug.paidParkingCircle:
        return require("../../assets/images/zone-in-map/paid-parking.png");
      case geofenceTypeSlug.notScooters:
        return require("../../assets/images/zone-in-map/scooter-ban-zone.png");
      default:
        return require("../../assets/images/zone-in-map/no-parking.png");
    }
  };

  const parkingStyleWrapper =
    selectedGeofence &&
    selectedGeofence.id === geofence.id &&
    selectedGeofence.type.slug === geofenceTypeSlug.parkingCircle
      ? gStyles.parkingMapWrapperActive
      : gStyles.parkingMapWrapper;

  const parkingStyleContainer =
    selectedGeofence &&
    selectedGeofence.id === geofence.id &&
    selectedGeofence.type.slug === geofenceTypeSlug.parkingCircle
      ? gStyles.parkingMapContainerActive
      : gStyles.parkingMapContainer;

  const parkingStyleArrowDown =
    selectedGeofence &&
    selectedGeofence.id === geofence.id &&
    selectedGeofence.type.slug === geofenceTypeSlug.parkingCircle
      ? gStyles.parkingMapArrowDownActive
      : gStyles.parkingMapArrowDown;

  const LAYER_POLYGON = [
    {
      latitude: -179.9296872,
      longitude: 85.0480934,
    },
    {
      latitude: 179.9934078,
      longitude: 85.0534041,
    },
    {
      latitude: 178.0224609,
      longitude: -85.0511288,
    },
    {
      latitude: -180.0087896,
      longitude: -85.0511288,
    },
    {
      latitude: -180.0175779,
      longitude: 85.0499939,
    },
  ];

  return (
    <Fragment>
      {updatedCoordinates && centerLat && centerLng ? (
        <Fragment>
          {/* {geofence.type.slug === geofenceTypeSlug.mainZone && (
            <Polygon
              coordinates={LAYER_POLYGON}
              strokeColor="transparent"
              fillColor={
                zoom >= 7 ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.0)"
              }
              holes={[updatedCoordinates]}
              tappable
              onPress={() =>
                setGeofenceType({
                  id: Math.random(),
                  type: {
                    slug: geofenceTypeSlug.outOfZone,
                  },
                })
              }
            />
          )} */}

          {geofence.type.slug === geofenceTypeSlug.mainZone ? (
            <Polygon
              coordinates={updatedCoordinates}
              fillColor={fillColor}
              strokeColor="rgb(255, 0, 0)"
              lineDashPattern={dashPattern}
              tappable
              onPress={() => setGeofenceType(geofence)}
              zIndex={14}
            />
          ) : (
            <Polygon
              coordinates={updatedCoordinates}
              fillColor={fillColor}
              strokeColor="rgb(255, 0, 0)"
              lineDashPattern={dashPattern}
              tappable
              onPress={() => setGeofenceType(geofence)}
              zIndex={20}
            />
          )}
        </Fragment>
      ) : null}

      {updatedCircleCoordinates && circleRadius ? (
        <Circle
          radius={
            selectedGeofence?.type.drawType === "CIRCLE" &&
            selectedGeofence.id === geofence.id
              ? circleRadius
              : 0
          }
          center={{
            latitude: updatedCircleCoordinates.latitude,
            longitude: updatedCircleCoordinates.longitude,
          }}
          fillColor="rgba(0, 0, 255, 0.2)"
          strokeColor="rgba(0, 0, 255, 0.2)"
        />
      ) : null}

      {geofence.type.slug !== "mainZone" &&
      markerCenterLat &&
      markerCenterLng ? (
        <Marker
          coordinate={{
            latitude: markerCenterLat,
            longitude: markerCenterLng,
          }}
          // style={{ display: "flex", width: 60, height: 60 }}
          opacity={zoom >= 13 ? 1 : 0}
          icon={undefined}
          onPress={() => setGeofenceType(geofence)}
          // tracksViewChanges={false}
        >
          {geofence.type.drawType === "CIRCLE" &&
          geofence.type.slug === geofenceTypeSlug.parkingCircle &&
          geofence.scooters.length > 0 ? (
            <Pressable style={parkingStyleContainer}>
              <View style={gStyles.parkingMapBox}>
                <Shadow {...ShadowMarkerActive.marker}>
                  <View style={parkingStyleWrapper}>
                    <Image
                      style={gStyles.parkingMapIcon}
                      source={setGeofenceIcon()}
                    />
                    <Text style={gStyles.parkingMapCountScoot}>
                      {geofence.scooters.length}
                    </Text>
                  </View>
                </Shadow>
                <View style={parkingStyleArrowDown} />
              </View>
              {selectedGeofence &&
              selectedGeofence.type.drawType === "CIRCLE" &&
              selectedGeofence.id === geofence.id ? (
                <Shadow {...ShadowMarkerCircle.marker}>
                  <View style={gStyles.parkingMapCircle}></View>
                </Shadow>
              ) : null}
            </Pressable>
          ) : geofence.type.slug === geofenceTypeSlug.parkingCircle &&
            selectedGeofence &&
            selectedGeofence.type.drawType === "CIRCLE" &&
            selectedGeofence.id === geofence.id ? (
            <Pressable style={parkingStyleContainer}>
              <View style={gStyles.parkingMapBox}>
                <Shadow {...ShadowMarkerActive.marker}>
                  <View style={parkingStyleWrapper}>
                    <Image
                      style={gStyles.parkingMapIcon}
                      source={setGeofenceIcon()}
                    />
                    <Text style={gStyles.parkingMapCountScoot}>
                      {geofence.scooters.length}
                    </Text>
                  </View>
                </Shadow>
                <View style={parkingStyleArrowDown} />
              </View>
              {selectedGeofence &&
              selectedGeofence.type.drawType === "CIRCLE" &&
              selectedGeofence.id === geofence.id ? (
                <Shadow {...ShadowMarkerCircle.marker}>
                  <View style={gStyles.parkingMapCircle}></View>
                </Shadow>
              ) : null}
            </Pressable>
          ) : (
            <View style={gStyles.parkingMapContainer}>
              <Image
                source={setGeofenceIcon()}
                style={gStyles.parkingMapIcon}
              />
            </View>
          )}
        </Marker>
      ) : null}
    </Fragment>
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

export default React.memo(CustomPolygon);
