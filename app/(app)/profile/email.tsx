import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import { useUserStore } from "@/stores/user-store";
import userService from "@/services/user.service";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import request from "axios";
import { useControllUiStore } from "@/stores/controll-ui-store";

export default function EmailPage() {
  const { user, updateUserField } = useUserStore();

  const setIsLoading = useControllUiStore((state) => state.setIsLoading);

  const [email, setEmail] = useState<string>(user?.email || "");
  const compareEmail = user?.email;

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (text: string) => {
    const isValid = /\S+@\S+\.\S+/.test(text);
    setIsValidEmail(isValid);
    setEmail(text);
  };

  const handleChangeUserEmail = async () => {
    if (!user) {
      return;
    }

    const data = {
      email: email,
    };

    setIsLoading(true);

    try {
      const res = await userService.update(user.id, data);
      if (res.email) {
        updateUserField("email", res.email);
      }

      Toast.show({
        type: "success",
        text1: "Почта пользователя успешно изменена 👋",
      });
      router.navigate("/(app)/profile/");
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        Toast.show({
          type: "error",
          text1: err.response.data.message,
        });
      }
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
            <Text style={gStyles.pagePTitle}>Ваш адрес электронной почты</Text>
            <View style={gStyles.pageRefillAddSum}>
              <TextInput
                style={gStyles.pageNameInput}
                placeholder="friend@yandex.ru"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                autoFocus={true}
                maxLength={250}
                multiline={true}
                onChangeText={validateEmail}
              />
            </View>
          </View>
        </View>

        <View style={gStyles.pageRefillIAddBtnBox}>
          <TouchableOpacity
            style={[
              mzStyles.BtnOk,
              (!isValidEmail || email === "" || email === compareEmail) &&
                mzStyles.disabledBtn,
            ]}
            disabled={!isValidEmail || email === "" || email === compareEmail}
            onPress={handleChangeUserEmail}
          >
            <Text style={mzStyles.BtnOkTxt}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
