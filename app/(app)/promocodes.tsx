import { useControllUiStore } from "@/stores/controll-ui-store";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import request from "axios";
import promocodeService from "@/services/promocode.service";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import { useUserStore } from "@/stores/user-store";
import { router, useNavigation } from "expo-router";
import { PromocodeStatus } from "@/interfaces/promocode";

import PromocodeUseModal from "@/components/ui/Modals/PromocodeUseModal";

export default function PromocodesPage() {
  const [code, setCode] = useState<string>();

  const [codeStatus, setCodeStatus] = useState<PromocodeStatus | null>();
  const [codeSum, setCodeSum] = useState<number>(0);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const setIsLoading = useControllUiStore((state) => state.setIsLoading);
  const { user, updateUserField } = useUserStore();

  const handleSetIsModalVisibleFalse = () => {
    setIsModalVisible(false);
    setCodeStatus(null);
    setCodeSum(0);
  };

  const usePromocode = async () => {
    if (!code) return;
    if (!user) return;

    setIsLoading(true);

    try {
      const res = await promocodeService.use(code);

      setCodeStatus("SUCCESS");
      setCodeSum(res.sum);
      setIsModalVisible(true);

      // Alert.alert(`Промокод ${res.code} успешно иcпользован!`);
      updateUserField("balance", user.balance + Number(res.sum));
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        setIsModalVisible(true);
        if (err.response.data.message.includes("истек")) {
          setCodeStatus("EXPIRED");
          return;
        }
        if (err.response.data.message.includes("использовали")) {
          setCodeStatus("USED");
          return;
        }
        setCodeStatus("NOTEXIST");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    const reset = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Keyboard.dismiss();

      const timeout = setTimeout(() => {
        navigation.dispatch(e.data.action);
      }, 200);

      return () => clearTimeout(timeout);
    });
    return reset;
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 86 : 96} // Компенсация для верхнего заголовка (если есть)
    >
      <View style={gStyles.pageProfileSection}>
        <PromocodeUseModal
          type={codeStatus}
          isVisible={isModalVisible}
          name={code}
          setModalVisible={handleSetIsModalVisibleFalse}
          codeSum={codeSum}
        />

        <Text>Есть промокод? Вводи!</Text>
        <View style={gStyles.pageRefillAddSum}>
          <TextInput
            style={gStyles.pageNameInput}
            autoCapitalize={"characters"}
            keyboardType="default"
            value={code}
            maxLength={50}
            autoFocus={true}
            // multiline={true}
            onChangeText={(text) => setCode(text)}
          />
        </View>
        <TouchableOpacity style={mzStyles.BtnOk} onPress={usePromocode}>
          <Text style={mzStyles.BtnOkTxt}>Применить</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
