import React, { useState, useRef, Fragment } from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import { RadioButton } from "react-native-radio-buttons-group";
import { useUserStore } from "@/stores/user-store";
import userService from "@/services/user.service";
import paymentService from "@/services/payment.service";
import { IPaymentMethod } from "@/interfaces/payment/payment-method.interface";
import { router } from "expo-router";
import { storage } from "@/storage";
import { useControllUiStore } from "@/stores/controll-ui-store";

export default function BalanceTopUpPage() {
  const { user, setUser, setPaymentUrl } = useUserStore();

  const setIsLoading = useControllUiStore((state) => state.setIsLoading);

  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  const [selected, setSelected] = useState<string | undefined>(
    user?.activePaymentMethod?.toString()
  );

  const [isAddPaymentMethod, setIsAddPaymentMethod] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const yourInputRef = useRef(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setIsOpened(true);
    Keyboard.dismiss();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsOpened(false);
  };

  const insets = useSafeAreaInsets();

  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");

  const activePaymentMethod: any = user?.paymentMethods.findIndex(
    (x) => x.id === user.activePaymentMethod
  );

  const currentPaymentMethod =
    selected === "sbp" || selected === "sber"
      ? selected
      : user?.paymentMethods.findIndex((x) => x.id === Number(selected));

  const handleSetPaymentMethod = async (paymentId: number | string) => {
    if (!user) {
      return;
    }

    if (paymentId.toString() === selected) {
      return;
    }

    setSelected(paymentId.toString());
  };

  const handleAddPaymentMethod = async () => {
    const data = {
      userId: user?.id,
    };
    const payment = await paymentService.addPaymentMethod(data);

    if (!payment) {
      alert("Не получилось привязать карту");
    }

    setPaymentUrl(payment.payment.confirmation.confirmation_url);
    router.navigate("/(app)/payment");
    setIsAddPaymentMethod(false);
  };

  const handleCreatePayment = async () => {
    if (Number(number) < 20) {
      Alert.alert("Сумма должна быть не менее 20 рублей!");
      return;
    }

    if (typeof currentPaymentMethod !== "number") {
      return;
    }

    setIsLoading(true);

    const data = {
      value: Number(number),
      type: "bank_card",
      description: "Пополнение баланса",
      metadata: {
        type: "BALANCE",
        desctiption: "Пополнение баланса",
      },
      paymentMethodId: user?.paymentMethods[currentPaymentMethod].id,
      paymentMethodStringId:
        user?.paymentMethods[currentPaymentMethod].paymentId,
      userId: user?.id,
    };

    try {
      const res = await paymentService.createPayment(data);
      if (res) {
        const user = await userService.getMe();
        setUser(user);
        setIsLoading(false);
        // storage.set('payment', res.amount);
        router.push("/(app)/wallet/success-payment");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const setPaymentMethodIcon = (paymentMethod: string | number | undefined) => {
    switch (paymentMethod) {
      case "Visa":
        return require("../../../assets/images/pay-method/visa.png");
      case "Mir":
        return require("../../../assets/images/pay-method/mir.png");
      case "sbp":
        return require("../../../assets/images/pay-method/sbp.png");
      case "sber":
        return require("../../../assets/images/pay-method/sberpay.png");
      default:
        return require("../../../assets/images/pay-method/mastercard.png");
    }
  };

  const paymentMethods = user
    ? user.paymentMethods.filter((x) => x?.cardLastFour !== null)
    : [];

  return (
    <GestureHandlerRootView style={{ height: "100%" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 86 : 96} // Компенсация для верхнего заголовка (если есть)
      >
        <View style={gStyles.pageRefill}>
          <View style={gStyles.pageProfile}>
            <View style={gStyles.pageProfileSection}>
              <Text style={gStyles.pagePTitle}>Откуда</Text>

              <View style={gStyles.payHistoryBoxItem}>
                <View style={gStyles.pageItemLine}></View>

                <TouchableOpacity
                  style={gStyles.pageProfileUserItem}
                  onPress={openBottomSheet}
                >
                  <View style={gStyles.pageWalletPayData}>
                    <View style={gStyles.payMethodIconBox}>
                      {typeof currentPaymentMethod === "number" ? (
                        <Image
                          style={gStyles.payMethodIcon}
                          source={setPaymentMethodIcon(
                            user?.paymentMethods[currentPaymentMethod]?.cardType
                          )}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          style={gStyles.payMethodIcon}
                          source={setPaymentMethodIcon(currentPaymentMethod)}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                    {typeof currentPaymentMethod === "number" ? (
                      <View style={gStyles.pageProfileUserItemData}>
                        <Text style={gStyles.pagePDescr}>
                          {user?.paymentMethods[currentPaymentMethod]?.cardType}
                        </Text>
                        <Text style={gStyles.pagePName}>
                          *{" "}
                          {
                            user?.paymentMethods[currentPaymentMethod]
                              ?.cardLastFour
                          }
                        </Text>
                      </View>
                    ) : (
                      <View style={gStyles.pageProfileUserItemData}>
                        <Text style={gStyles.pagePDescr}>
                          {currentPaymentMethod === "sbp" ? "СБП" : "Сбер"}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View>
                    <Image
                      style={gStyles.pageProfileIconArrow}
                      source={require("../../../assets/images/arrow-upward.png")}
                    />
                  </View>
                </TouchableOpacity>

                <View style={gStyles.pageItemLine}></View>
              </View>

              <View style={gStyles.pageRefillAddSum}>
                <TextInput
                  style={gStyles.pageRefillInput}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="0"
                  keyboardType="numeric"
                  autoFocus={true}
                  ref={yourInputRef}
                />
                <Image
                  style={gStyles.pageRefillIconRub}
                  source={require("../../../assets/images/rub-b.png")}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View style={gStyles.pageRefillIAddBtnBox}>
            <TouchableOpacity
              style={mzStyles.BtnOk}
              onPress={() => handleCreatePayment()}
            >
              <Text style={mzStyles.BtnOkTxt}>Пополнить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* <Button title="Пополнить баланс" onPress={openBottomSheet}/> */}
      {/* <Text>Привет</Text> */}

      <BottomSheet
        containerStyle={{
          marginTop: insets.top,
        }}
        ref={bottomSheetRef}
        index={-1}
        // snapPoints={snapPoints}
        enableDynamicSizing={true}
        // maxDynamicContentSize={100}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: "#CACACA",
          width: 36,
          height: 4,
        }}
        handleHeight={0}
        backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
        handleStyle={{ padding: 6 }}
        onClose={() => {
          setIsAddPaymentMethod(false);
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.3}
            enableTouchThrough={false}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            style={[{ backgroundColor: "#000" }, gStyles.absoluteFillObject]}
          />
        )}
        // handleStyle={{ display: "none" }}
      >
        <BottomSheetScrollView>
          {!isAddPaymentMethod ? (
            <View style={gStyles.pageProfileSection}>
              <View style={gStyles.payHistoryBoxItem}>
                <TouchableOpacity
                  style={gStyles.pageProfileUserItem}
                  onPress={() => handleSetPaymentMethod("sbp")}
                  id="sbp"
                >
                  <View style={gStyles.pageWalletPayData}>
                    <View style={gStyles.payMethodIconBox}>
                      <Image
                        style={gStyles.payMethodIcon}
                        source={require("../../../assets/images/pay-method/sbp.png")}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={gStyles.pageProfileUserItemData}>
                      {/* <Text style={gStyles.pagePDescr}>MasterCard</Text> */}
                      <Text style={gStyles.pagePName}>СБП</Text>
                    </View>
                  </View>
                  <View>
                    <RadioButton
                      id={"sbp"}
                      selected={selected === "sbp" ? true : false}
                    />
                  </View>
                </TouchableOpacity>
                <View style={gStyles.pageItemLine}></View>
                <TouchableOpacity
                  style={gStyles.pageProfileUserItem}
                  onPress={() => handleSetPaymentMethod("sber")}
                  id="sber"
                >
                  <View style={gStyles.pageWalletPayData}>
                    <View style={gStyles.payMethodIconBox}>
                      <Image
                        style={gStyles.payMethodIcon}
                        source={require("../../../assets/images/pay-method/sberpay.png")}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={gStyles.pageProfileUserItemData}>
                      {/* <Text style={gStyles.pagePDescr}>MasterCard</Text> */}
                      <Text style={gStyles.pagePName}>SberPay</Text>
                    </View>
                  </View>
                  <View>
                    <RadioButton
                      id={"sber"}
                      selected={selected === "sber" ? true : false}
                    />
                  </View>
                </TouchableOpacity>
                <View style={gStyles.pageItemLine}></View>
                {user &&
                  paymentMethods?.length > 0 &&
                  paymentMethods.map((payment, index) => (
                    <Fragment key={payment.id}>
                      <TouchableOpacity
                        style={gStyles.pageProfileUserItem}
                        onPress={() => handleSetPaymentMethod(payment.id)}
                      >
                        <View style={gStyles.pageWalletPayData}>
                          <View style={gStyles.payMethodIconBox}>
                            <Image
                              style={gStyles.payMethodIcon}
                              source={setPaymentMethodIcon(payment?.cardType)}
                              resizeMode="contain"
                            />
                          </View>
                          <View style={gStyles.pageProfileUserItemData}>
                            <Text style={gStyles.pagePDescr}>
                              {payment?.cardType}
                            </Text>
                            <Text style={gStyles.pagePName}>
                              * {payment?.cardLastFour}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <RadioButton
                            id={payment.id.toString()}
                            selected={
                              selected === payment.id.toString() ? true : false
                            }
                          />
                        </View>
                      </TouchableOpacity>
                      {payment.id ===
                      paymentMethods[paymentMethods.length - 1].id ? null : (
                        <View style={gStyles.pageItemLine}></View>
                      )}
                    </Fragment>
                  ))}
              </View>
              <TouchableOpacity
                style={gStyles.btnPayMethod}
                onPress={() => setIsAddPaymentMethod(true)}
              >
                <View style={gStyles.payMethodAddBtnBox}>
                  <Image
                    style={gStyles.payMethodIconPlus}
                    source={require("../../../assets/images/pay-method/plus.png")}
                    resizeMode="contain"
                  />
                  <Text style={mzStyles.BtnOkTxt}>Добавить способ оплаты</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={gStyles.pageProfileSection}>
              <View style={gStyles.payMethodSelectTitle}>
                {/* <TouchableOpacity onPress={() => setIsAddPaymentMethod(false)}>
                  <View style={gStyles.payMethodIconBack}>
                    <Image
                      style={gStyles.payMethodIcon}
                      source={require("../../../assets/images/pay-method/arrow-back.png")}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity> */}
                <Text style={gStyles.payMethodSelectTitleTxt}>
                  Выберите способ оплаты
                </Text>
              </View>
              {/* <Button
                title="Назад"
                onPress={() => setIsAddPaymentMethod(false)}
              /> */}
              <View style={gStyles.payHistoryBoxItem}>
                <TouchableOpacity
                  style={gStyles.pageProfileUserItem}
                  //   onPress={() => handleSetPaymentMethod("sber")}
                  id="sber"
                >
                  <View style={gStyles.pageWalletPayData}>
                    <View style={gStyles.payMethodIconBox}>
                      <Image
                        style={gStyles.payMethodIcon}
                        source={require("../../../assets/images/pay-method/sberpay.png")}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={gStyles.pageProfileUserItemData}>
                      {/* <Text style={gStyles.pagePDescr}>MasterCard</Text> */}
                      <Text style={gStyles.pagePName}>
                        Привязать счет SberPay
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={gStyles.pageProfileIconArrow}
                      source={require("../../../assets/images/arrow-upward.png")}
                    />
                  </View>
                </TouchableOpacity>
                <View style={gStyles.pageItemLine}></View>

                <TouchableOpacity
                  style={gStyles.pageProfileUserItem}
                  onPress={handleAddPaymentMethod}
                >
                  <View style={gStyles.pageWalletPayData}>
                    <View style={gStyles.payMethodIconBox}>
                      <Image
                        style={gStyles.payMethodIcon}
                        source={require("../../../assets/images/pay-method/add-card.png")}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={gStyles.pageProfileUserItemData}>
                      <Text style={gStyles.pagePName}>Привязать карту</Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={gStyles.pageProfileIconArrow}
                      source={require("../../../assets/images/arrow-upward.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
