import * as Location from "expo-location";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "./use-auth";
import { useLocation } from "./use-location";

export const useGps = () => {
  const segments = useSegments();

  const { isAuth } = useAuth();
  const { error } = useLocation();

  useEffect(() => {
    console.log(segments);

    if (error) return;

    const interval = setInterval(async () => {
      console.log("В интеравале GPS");
      const isGpsEnabled = await Location.hasServicesEnabledAsync();
      if (!isGpsEnabled && segments[0] === "(app)") {
        router.replace("/(public)/location-denied");
      }
      if (
        isGpsEnabled &&
        isAuth &&
        segments[0] === "(public)" &&
        segments[1] === "location-denied"
      ) {
        router.replace("/(app)");
      } else if (isGpsEnabled && !isAuth) {
        router.replace("/(public)/auth");
      }
    }, 3000);

    if (segments[0] === "(app)" && segments.length > 1) {
      return clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isAuth, segments, error]);
};
