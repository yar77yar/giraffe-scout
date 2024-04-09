import userService from "@/services/user.service";
import { useControllUiStore } from "@/stores/controll-ui-store";
import { useUserStore } from "@/stores/user-store";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, usePathname, useSegments } from "expo-router";
import { Fragment, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";

const AuthLayout = () => {
  const setUser = useUserStore((state) => state.setUser);
  const loading = useControllUiStore((state) => state.loading);
  // const userQuery = useQuery({
  //   queryKey: ['user'],
  //   queryFn: userService.getMe,
  // })

  useEffect(() => {
    (async () => {
      try {
        const data = await userService.getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // if (userQuery.status === "pending") {
  //   return (
  //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //           <Text>Загрузка...</Text>
  //       </View>
  //   )
  // }

  // if (userQuery.status === "error") {
  //   return (
  //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //           <Text>Нет доступа! Похоже протух токен</Text>
  //       </View>
  //   )
  // }

  // if (userQuery.status === "success") {
  //   setUser(userQuery.data);
  // }

  const pathname = useSegments();

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const isGpsEnabled = await Location.hasServicesEnabledAsync();
  //     if (!isGpsEnabled) {
  //       router.replace("/(public)/location-denied");
  //     }
  //   }, 1000);

  //   if (pathname[0] === "(app)" && pathname.length > 1) {
  //     return clearInterval(interval);
  //   }

  //   return () => clearInterval(interval);
  // }, [pathname]);

  return (
    <Fragment>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
        <Stack.Screen name="scooter-code" options={{ headerShown: true }} />

        <Stack.Screen
          name="profile/index"
          options={{
            headerShown: true,
            headerTitle: "Профиль",
          }}
        />
        <Stack.Screen
          name="profile/name"
          options={{
            headerShown: true,
            headerTitle: "Имя",
          }}
        />
        <Stack.Screen
          name="profile/email"
          options={{ headerShown: true, headerTitle: "Почта" }}
        />
        <Stack.Screen
          name="profile/agreement"
          options={{
            headerShown: true,
            headerTitle: "Договор о присоединении",
          }}
        />
        <Stack.Screen
          name="profile/politics"
          options={{
            headerShown: true,
            headerTitle: "Политика конфиденциальности",
          }}
        />
        <Stack.Screen
          name="promocodes"
          options={{
            headerShown: true,
            headerTitle: "Промокоды",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="subscriptions"
          options={{ headerShown: true, headerTitle: "Подписки" }}
        />
        <Stack.Screen
          name="trip-history"
          options={{ headerShown: true, headerTitle: "История поездок" }}
        />
        <Stack.Screen
          name="trip/[id]"
          options={{
            headerShown: true,
            headerTitle: "Страница поездки",
            title: "Поездка",
          }}
        />
        <Stack.Screen
          name="wallet/index"
          options={{ headerShown: true, headerTitle: "Кошелек" }}
        />
        <Stack.Screen
          name="wallet/top-up-balance"
          options={{ headerShown: true, headerTitle: "Пополнение" }}
        />
        <Stack.Screen
          name="wallet/success-payment"
          options={{ headerShown: false, headerTitle: "Успешный платеж" }}
        />

        <Stack.Screen
          name="tariff"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="payment" options={{ headerShown: true }} />
        <Stack.Screen name="guide" options={{ headerShown: false }} />
      </Stack>
      <Toast />
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={"#FFFF00"}
          style={{
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      )}
    </Fragment>
  );
};

export default AuthLayout;
