import React, { useState, useRef, useEffect, Component } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import gStyles from "@/styles/style";
import { useUserStore } from "@/stores/user-store";
import userService from "@/services/user.service";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useControllUiStore } from "@/stores/controll-ui-store";
import { useAuthStore } from "@/stores/auth-store";
import authService from "@/services/auth.service";
import { storeData } from "@/storage/async-storage";
import { AUTH_TOKEN } from "@/api/constants";

export default function NamePage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [focusedInput, setFocusedInput] = useState<any>(null);
  const [attempts, setAttempts] = useState(0);
  const [isCodeError, setIsCodeError] = useState(false);
  const [isIntervalEnd, setIsIntervalEnd] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);

  const inputs = useRef<any[]>([]);

  const { phoneNumber, setPhoneNumber } = useAuthStore();

  const handleChangeText = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Перемещение фокуса на следующий TextInput
    if (value.length === 1 && index < code.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (code[index].length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    } else {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  function makeTwoDigits(num: number) {
    if (num >= 0 && num <= 9) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }

  const handleSendCode = async () => {
    if (!phoneNumber) {
      // setIsIntervalEnd(false);
      // setIsCodeError(false);
      // setMinutes(1);
      return;
    }

    try {
      const res = await authService.sendCode(phoneNumber);
      setMinutes(1);
      setIsIntervalEnd(false);
      setIsCodeError(false);
    } catch (err) {
      Alert.alert("Не удалось отправить код");
    }
  };

  const handleConfirmAuth = async () => {
    const CODE = 5544;

    let result = "";
    for (const digit of code) {
      if (digit.length > 0) {
        result += digit;
      }
    }
    if (result.length < 4) {
      return;
    }

    setAttempts((prev) => prev + 1);

    if (attempts === 2) {
      Alert.alert("Попытки исчерпаны, повтори через минуту");
      setAttempts(0);
      setIsIntervalEnd(false);
      setMinutes(1);
      setSeconds(0);
      setDisabled(true);
      setCode(["", "", "", ""]);
      inputs.current[0].focus();
      return;
    }

    // TestCase

    if (Number(result) !== CODE) {
      setIsCodeError(true);
      setCode(["", "", "", ""]);
      inputs.current[0].focus();
      return;
    }
    setIsCodeError(false);
    await storeData("token", AUTH_TOKEN);
    router.replace("/(app)");

    // ProdCase

    // try {
    //   const res = await authService.confirmAuth(Number(result));
    //   console.log(res);
    //   setIsCodeError(false);
    //   await storeData("token", res);
    //   router.replace("/(app)");
    // } catch (err) {
    //   setIsCodeError(true);
    //   setCode(["", "", "", ""]);
    //   inputs.current[0].focus();
    // }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 1) {
        setMinutes(0);
        setSeconds(59);
        return;
      }
      if (seconds === 0) {
        setDisabled(false);
        setIsIntervalEnd(true);
        return () => clearInterval(interval);
      }
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isIntervalEnd, seconds, minutes]);

  useEffect(() => {
    handleConfirmAuth();
  }, [code]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 86 : 96} // Компенсация для верхнего заголовка (если есть)
    >
      <View style={gStyles.pageRefill}>
        <View style={gStyles.pageProfile}>
          <View style={gStyles.pageAuthWrapper}>
            {/* <Text style={gStyles.pagePTitle}>Как вас зовут?</Text> */}
            <Text style={gStyles.pageAuthTitle}>Код подтверждения</Text>
            <Text style={gStyles.pageAuthDesc}>для номера {phoneNumber}</Text>

            <View style={styles.container}>
              {code.map((value, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.input,
                    code[index].length > 0 ||
                    focusedInput === index ||
                    index === 0
                      ? { borderWidth: 2, backgroundColor: "transparent" }
                      : null,
                  ]}
                  editable={!disabled}
                  selectTextOnFocus={!disabled}
                  value={value}
                  onChangeText={(text) => handleChangeText(index, text)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={(ref) => (inputs.current[index] = ref)}
                  selection={{ start: value.length, end: value.length }}
                  onFocus={() =>
                    setFocusedInput(code[index].length > 0 ? index : 0)
                  }
                />
              ))}
            </View>

            {isCodeError && (
              <Text
                style={{
                  ...styles.smsConfirmFalse,
                }}
              >
                Неверный код!
              </Text>
            )}

            {isIntervalEnd ? (
              <TouchableOpacity
                style={{
                  ...styles.smsConfirmSendCodeBox,
                }}
                onPress={() => handleSendCode()}
              >
                <Text style={styles.smsConfirmSendCode}>
                  Отправить код повторно
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  ...styles.smsConfirmTimer,
                }}
              >
                Отправить код повторно: {makeTwoDigits(minutes)}:
                {makeTwoDigits(seconds)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    // width: '60%',
    gap: 16,
  },
  input: {
    width: 50,
    height: 60,
    textAlign: "center",
    // borderWidth: 2,
    borderColor: "#FEC303",
    backgroundColor: "#F2F4F6",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "600",
  },
  smsConfirmTimer: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: "#857B7B",
  },
  smsConfirmSendCode: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
    color: "#1882FF",
  },
  smsConfirmSendCodeBox: {
    borderBottomWidth: 1,
    borderColor: "#1882FF",
  },
  smsConfirmFalse: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 24,
    color: "#FF3333",
  },

  // Стили со страницы AUTH
});
