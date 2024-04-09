import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import MapView, {
  Camera,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
} from "react-native-maps";
import { useQuery } from "@tanstack/react-query";
import geofenceService from "@/services/geofence.service";
import CustomPolygon from "./CustomPolygon";
import { Fragment, useState, useRef, LegacyRef, FC, useEffect } from "react";
import ScooterMarker from "./ScooterMarker";
import scooterService from "@/services/scooter.service";
import { GOOGLE_KEY } from "@/api/constants";
import { useScooterStore } from "@/stores/scooter-store";
import { LocationObject } from "expo-location";
import { geofenceTypeSlug } from "@/enums/geofenceTypesSlugEnum";
import { useGeofenceStore } from "@/stores/geofence-store";
import { useLocation } from "@/hooks/use-location";
import UserLocation from "../geo/UserLocation";

type Props = {
  location: LocationObject;
};

type Coordinates = {
  lat: number;
  lng: number;
};

const Map: FC<Props> = ({ location }) => {
  const { setScooters, selectedScooter, zoomType } = useScooterStore();
  const { setGeofenceType, setGeofences } = useGeofenceStore();

  const REFETCH_INTERVAL = 10 * 600000;

  const [selectedRegion, setSelectedRegion] = useState({
    latitude: location ? location.coords.latitude : 55.753218,
    longitude: location ? location.coords.longitude : 37.621294,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const geofenceQuery = useQuery({
    queryKey: ["geofences"],
    queryFn: geofenceService.getAll,
    refetchInterval: REFETCH_INTERVAL,
  });

  const scooterQuery = useQuery({
    queryKey: ["scooters"],
    queryFn: scooterService.getAll,
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (geofenceQuery.status === "success") {
      const parking = geofenceQuery.data.filter(
        (g) => g.type.drawType === "CIRCLE"
      );
      setGeofences(parking);
    }
  }, [geofenceQuery.status]);

  useEffect(() => {
    if (scooterQuery.status === "success") {
      setScooters(scooterQuery.data);
    }
  }, [scooterQuery.status]);

  const mapRef: LegacyRef<MapView> = useRef(null);

  const onZoomInPress = () => {
    mapRef?.current?.getCamera().then((cam: Camera) => {
      if (cam && cam.zoom) {
        cam.zoom += 1;
        mapRef?.current?.animateCamera(cam);
      }
      return;
    });
  };

  const onZoomOutPress = () => {
    mapRef?.current?.getCamera().then((cam: Camera) => {
      if (cam && cam.zoom) {
        cam.zoom -= 1;
        mapRef?.current?.animateCamera(cam);
      }
      return;
    });
  };

  const currentZoomLevel = Math.round(
    Math.log(360 / selectedRegion.longitudeDelta) / Math.LN2
  );

  const zoomToUserLocation = () => {
    mapRef?.current?.getCamera().then((cam: Camera) => {
      if (cam && cam.zoom) {
        cam.center = location.coords;
        cam.zoom = 16;
        mapRef?.current?.animateCamera(cam);
      }
      return;
    });
  };

  const myPlace: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [36.92180047886103, 55.957511839507816],
              [36.92180047886103, 55.18522601212845],
              [38.411417903166836, 55.18522601212845],
              [38.411417903166836, 55.957511839507816],
              [36.92180047886103, 55.957511839507816],
            ],
          ],
        },
      },
    ],
  };

  const REGION = {
    latitude:
      (selectedScooter && selectedScooter.rightechScooter?.state.lat) ||
      55.74858947,
    longitude:
      (selectedScooter && selectedScooter.rightechScooter?.state.lon) ||
      37.6106472,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  useEffect(() => {
    if (!selectedScooter) return;
    if (!zoomType) return;
    if (zoomType !== "QR") return;
    mapRef?.current?.animateToRegion(REGION, 1);
  }, [selectedScooter]);

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

  const coordinates =
    geofenceQuery.data &&
    geofenceQuery.data.map((geofence) => {
      if (
        geofence.coordinates &&
        geofence.type.drawType === "POLYGON" &&
        geofence.type.slug === geofenceTypeSlug.mainZone
      ) {
        const parsedCoord = JSON.parse(geofence.coordinates);
        return parsedCoord.map((x: Coordinates) => ({
          latitude: x.lat,
          longitude: x.lng,
        }));
      }
      return [];
    });

  return (
    <Fragment>
      <View style={styles.containerMap}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={selectedRegion}
          onRegionChangeComplete={(region) => {
            setSelectedRegion(region);
          }}
          googleMapId={GOOGLE_KEY}
          loadingBackgroundColor="#00000070"
        >
          {/* User Location Marker */}

          <UserLocation location={location} />

          {coordinates && (
            <Polygon
              coordinates={LAYER_POLYGON}
              strokeColor="transparent"
              fillColor={
                currentZoomLevel >= 7
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(0, 0, 0, 0.0)"
              }
              holes={coordinates}
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
          )}

          {scooterQuery.data && geofenceQuery.data
            ? scooterQuery.data.map((x) => {
                return (
                  <ScooterMarker
                    key={x.scooter.id}
                    scooter={x}
                    geofences={geofenceQuery.data}
                    zoom={currentZoomLevel}
                  />
                );
              })
            : null}

          {geofenceQuery.data
            ? geofenceQuery.data.map((geofence) => (
                <CustomPolygon
                  key={geofence.id}
                  geofence={geofence}
                  zoom={currentZoomLevel}
                />
              ))
            : null}
        </MapView>
      </View>

      <View style={styles.zoomBtnContainer}>
        <View style={styles.zoomBtnWrapper}>
          <TouchableOpacity
            onPress={() => onZoomInPress()}
            // style={styles.zoomBtnOneBox}
          >
            <Image
              style={styles.zoomBtnIcon}
              source={require("../../assets/images/geo-plus.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onZoomOutPress()}
            // style={styles.zoomBtnOneBox}
          >
            <Image
              style={styles.zoomBtnIcon}
              source={require("../../assets/images/geo-minus.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => zoomToUserLocation()}
          // style={styles.userLocationBtnBox}
        >
          <Image
            style={styles.userLocationBtnIcon}
            source={require("../../assets/images/geo-user.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0,5)",
  },
  zoomBtnContainer: {
    position: "absolute",
    flex: 1,
    zIndex: 0,
    // top: 400,
    alignItems: "center",
    // bottom: 250,
    // bottom: 180,
    bottom: 80,
    right: 10,
    // gap: 24,
    gap: 124,
  },
  zoomBtnWrapper: {
    // backgroundColor: "#746D6D",
    display: "flex",
    gap: -8,
    alignItems: "center",
    // borderRadius: 24,
    // overflow: "hidden",
  },
  zoomBtnOneBox: {
    backgroundColor: "#373232",
    display: "flex",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 46,
  },
  zoomBtnInner: {
    fontSize: 28,
    color: "#fff",
  },
  // userLocationBtnBox: {
  //   backgroundColor: "#373232",
  //   display: "flex",
  //   alignSelf: "stretch",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: 46,
  //   width: 46,
  //   borderRadius: 200,
  // },
  userLocationBtnIcon: {
    height: 60,
    width: 60,
  },
  zoomBtnIcon: {
    height: 56,
    width: 48,
  },
});

const mapStyle = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#838383",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c4c4c4",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#aaaaaa",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#151516",
      },
      {
        lightness: "0",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        hue: "#ff0000",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        saturation: "-100",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#6e6e6e",
      },
      {
        lightness: "0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#575757",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c3c3c3",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#5f5f5f",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#717171",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];

export default Map;
