import React, { useState, useRef } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import { useUserStore } from "@/stores/user-store";
import userService from "@/services/user.service";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useControllUiStore } from "@/stores/controll-ui-store";

export default function NamePage() {
  const { updateUserField, user } = useUserStore();

  const setIsLoading = useControllUiStore((state) => state.setIsLoading);

  const [textInputValue, setTextInputValue] = useState<string>(
    user?.name || ""
  );
  const compareName = user?.name;
  const isButtonDisabled =
    textInputValue.length < 2 || textInputValue === compareName;

  const handleChangeUserName = async () => {
    if (!user) {
      return;
    }

    setIsLoading(true);

    const data = {
      name: textInputValue,
    };

    try {
      const res = await userService.update(user.id, data);
      if (res.name) {
        updateUserField("name", res.name);
      }

      Toast.show({
        type: "success",
        text1: "Имя пользователя успешно изменено 👋",
      });
      router.navigate("/(app)/profile/");
    } catch (err) {
      alert("Не удалось обновить имя");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 86 : 96} // Компенсация для верхнего заголовка (если есть)
    >
      <View style={gStyles.pageRefill}>
        <View style={gStyles.pageProfile}>
          <View style={gStyles.pageProfileSection}>
            <Text style={gStyles.pagePTitle}>Как вас зовут?</Text>

            <View style={gStyles.pageRefillAddSum}>
              <TextInput
                style={gStyles.pageNameInput}
                value={textInputValue}
                placeholder="Ваше имя"
                keyboardType="default"
                autoFocus={true}
                maxLength={25}
                textAlignVertical="center"
                textAlign="center"
                onChangeText={(text) => setTextInputValue(text)}
              />
            </View>
          </View>
        </View>

        <View style={gStyles.pageRefillIAddBtnBox}>
          <TouchableOpacity
            style={[mzStyles.BtnOk, isButtonDisabled && mzStyles.disabledBtn]}
            disabled={isButtonDisabled}
            onPress={handleChangeUserName}
          >
            <Text style={mzStyles.BtnOkTxt}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
