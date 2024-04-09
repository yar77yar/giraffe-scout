import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { LOCATION_TRACKING, START_GEOFENCING } from "./location-constants";
import { useLocationStore } from "@/stores/location-store";
import { router } from "expo-router";

export function useLocation() {
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationStarted, setLocationStarted] = useState<boolean>(false);

  const { location, setLocationAsync } = useLocationStore();

  const startTrakingPositionAsync = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 5000,
      distanceInterval: 0,
      foregroundService: {
        killServiceOnDestroy: true,
        notificationBody: "Yes",
        notificationTitle: "Yes",
      },
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    setLocationStarted(hasStarted);

    console.log("tracking started?", hasStarted);
  };

  useEffect(() => {
    (async () => {
      const isGpsEnabled = await Location.hasServicesEnabledAsync();
      if (!isGpsEnabled) {
        setErrorMsg("GPS Disabled");
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      let { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();

      if (status !== "granted" && backgroundStatus !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.BestForNavigation,
      });

      // let regionName = await Location.reverseGeocodeAsync({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // });

      setIsLocationLoading(false);
      setLocationAsync(location);
      startTrakingPositionAsync();
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return {
    location: location,
    error: errorMsg,
    isLocationLoading,
  };
}
