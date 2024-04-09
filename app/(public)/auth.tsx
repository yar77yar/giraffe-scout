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
import mzStyles from "@/styles/mod-zone-style";
import { useUserStore } from "@/stores/user-store";
import userService from "@/services/user.service";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useControllUiStore } from "@/stores/controll-ui-store";
import { TextInputMask } from "react-native-masked-text";
import authService from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NamePage() {
  const [international, setInternational] = useState("");
  const inputRef = useRef<any>(null);
  const [isFilled, setIsFilled] = useState(false);

  const [resFailure, setResFailure] = useState(false);

  const { setPhoneNumber } = useAuthStore();

  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.getElement().focus();
    }
  }, []);

  const handleInputChange = (text: string) => {
    setInternational(text);
    setIsFilled(text.length > 12);
  };

  const handleSendCode = async () => {
    try {
      const res = await authService.sendCode(`+7 ${international}`);
      setPhoneNumber(`+7 ${international}`);
      setResFailure(false);
      router.push("/(public)/confirm");
    } catch (err) {
      setResFailure(true);
    }
  };

  // Ссылка на сайт - Политику конфиденциальности
  const sitePrivacyLink = "https://giraffe-go.ru/privacy/";
  const openPrivacy = () => {
    Linking.openURL(sitePrivacyLink);
  };
  // Ссылка на сайт фирмы
  const siteAgreementLink = "https://giraffe-go.ru/agreement/";
  const openAgreement = () => {
    Linking.openURL(siteAgreementLink);
  };
  // Маска input
  // const [international, setInternational] = useState('');
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
            <Text style={gStyles.pageAuthTitle}>Номер телефона</Text>

            <View style={gStyles.PAphoneBox}>
              <View style={gStyles.PAphoneCoutry}>
                <Image
                  style={gStyles.PAphoneCoutryImg}
                  source={require("../../assets/images/auth/country/russia.png")}
                  resizeMode="contain"
                />
              </View>

              <View
                style={[
                  gStyles.PAphoneNumber,
                  isFilled && styles.filledPhoneNumber,
                ]}
                // style={gStyles.PAphoneNumber}
              >
                <View style={styles.boxInputPhone}>
                  <Text style={styles.phoneCode}>+7 </Text>

                  <TextInputMask
                    ref={inputRef}
                    type={"custom"}
                    options={{
                      mask: "999 999-99-99",
                    }}
                    value={international}
                    onChangeText={handleInputChange}
                    // onChangeText={text => {
                    //   setInternational(text);
                    // }}

                    style={styles.inputPhone}
                    keyboardType="numeric"
                    placeholder="999 999-99-99"
                  />
                </View>
              </View>
            </View>
            <Text style={gStyles.pageAuthDesc}>
              Мы отправим Вам код подтверждения
            </Text>
            {resFailure && (
              <Text
                style={{
                  ...styles.smsConfirmFalse,
                }}
              >
                Превышено максимальное число запросов. Повторите через минуту
              </Text>
            )}
          </View>
        </View>

        <View style={gStyles.pageAuthBtnBox}>
          <TouchableOpacity
            style={[mzStyles.BtnOk, !isFilled && styles.disabledBtn]}
            disabled={!isFilled}
            // onPress={() => handleSendCode()}
            onPress={() => router.navigate("/(public)/confirm")}
          >
            <Text style={mzStyles.BtnOkTxt}>Получить код</Text>
          </TouchableOpacity>

          <View style={styles.pageAuthDocs}>
            <Text style={gStyles.ptrInfoTxtMin}>
              Нажимая «Получить код», Вы принимаете
            </Text>
            <TouchableOpacity onPress={openPrivacy}>
              <Text style={[gStyles.ptrInfoTxtMin, styles.linkBlue]}>
                Политику конфиденциальности
              </Text>
            </TouchableOpacity>
            <Text style={gStyles.ptrInfoTxtMin}>и</Text>
            <TouchableOpacity onPress={openAgreement}>
              <Text style={[gStyles.ptrInfoTxtMin, styles.linkBlue]}>
                Оферту
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  boxInputPhone: {
    // flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'blue',
  },
  phoneCode: {
    fontSize: 18,
    fontWeight: "600",
  },
  inputContainer: {
    // position: 'relative',
  },
  inputPhone: {
    flex: 1,
    // display: 'flex',
    // alignSelf: 'stretch',
    height: 44,
    // width: '100%',
    // minWidth: 0,
    fontSize: 18,
    fontWeight: "600",
    // backgroundColor: 'green'
    // backgroundColor: 'transparent'
  },
  placeholder: {
    position: "absolute",
    top: 9,
    left: 0,
    fontSize: 18,
    fontWeight: "600",
    color: "#B5ADAD",
  },
  pageAuthDocs: {
    display: "flex",
    // flexDirection: 'row',
    // flex: 1,
    alignItems: "center",
    gap: 1,
    // justifyContent: 'center',
    // backgroundColor: 'green',
  },
  linkBlue: {
    color: "#1882FF",
    borderBottomWidth: 1,
    borderColor: "#1882FF",
  },
  disabledBtn: {
    opacity: 0.5,
  },
  filledPhoneNumber: {
    backgroundColor: "#F2F4F6",
    borderWidth: 0,
  },
  smsConfirmFalse: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 24,
    color: "#FF3333",
  },
});
