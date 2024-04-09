import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "@/hooks/use-location";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const InitialLayout = () => {
  const { isAuth, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const { error, location, isLocationLoading } = useLocation();

  useEffect(() => {
    if (!error) return;
    router.replace("/(public)/location-denied");
  }, [error]);

  useEffect(() => {
    if (isLocationLoading) return;
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(auth)";

    if (isAuth && !inTabsGroup) {
      router.replace("/(app)");
    } else if (!isAuth) {
      router.replace("/(public)/auth");
    }
  }, [isAuth, isLoading, isLocationLoading]);

  return <Slot />;
};

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <InitialLayout />
    </QueryClientProvider>
  );
}
