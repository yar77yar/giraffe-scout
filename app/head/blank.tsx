import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Blank = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ marginTop: top }}>
      <Text>Blank</Text>
    </View>
  );
};

export default Blank;
