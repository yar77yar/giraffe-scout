import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="auth" />
      <Stack.Screen name="confirm" />
      <Stack.Screen name="location-denied" options={{ headerShown: false }} />
    </Stack>
  );
}
