import { Stack } from "expo-router";

export default function HeadLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="blank" />
    </Stack>
  );
}
