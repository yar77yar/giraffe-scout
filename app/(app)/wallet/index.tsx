import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import paymentService from "@/services/payment.service";
import { useUserStore } from "@/stores/user-store";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import { RadioButton } from "react-native-radio-buttons-group";
import { IPaymentMethod } from "@/interfaces/payment/payment-method.interface";
import userService from "@/services/user.service";
import PaymentItem from "@/components/wallet/PaymentItem";
import { Payment } from "@/interfaces/user/user.interface";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AddPaymentMethod from "@/components/wallet/AddPaymentMethod";

type PaymentsData = {
  date: string;
  payments: Payment[];
};

export default function WalletPage() {
  const { user, setPaymentUrl, updateUserField } = useUserStore();

  const [selected, setSelected] = useState<string | undefined>(
    user?.activePaymentMethod?.toString()
  );

  const [selectedRenderPaymentsType, setSelectedRenderPaymentsType] =
    useState<string>("ALL");

  const { top } = useSafeAreaInsets();

  const paymentMethodBottomSheetRef = useRef<BottomSheet>(null);
  const openPaymentMethodBottomSheet = () =>
    paymentMethodBottomSheetRef.current?.expand();

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
  };

  const setPaymentMethodImage = (payment: IPaymentMethod) => {
    switch (payment.cardType) {
      case "MasterCard":
        return require("../../../assets/images/pay-method/mastercard.png");
      case "Visa":
        return require("../../../assets/images/pay-method/visa.png");
      case "Mir":
        return require("../../../assets/images/pay-method/mir.png");
      default:
        return require("../../../assets/images/pay-method/mastercard.png");
    }
  };

  const handleSetPaymentMethod = async (paymentId: number) => {
    if (!user) {
      return;
    }

    if (paymentId.toString() === selected) {
      return;
    }

    setSelected(paymentId.toString());

    const data = {
      activePaymentMethod: paymentId,
    };

    try {
      const res = await userService.update(user.id, data);
      updateUserField("activePaymentMethod", res.activePaymentMethod);
    } catch (error) {
      console.log(error);
    }
  };

  const lastPayment = user?.paymentMethods
    .filter((x) => x.cardFirstSix !== null)
    .pop();

  const replacementPayments = user?.payments.filter(
    (x) => x.type === "REPLACEMENT"
  );
  const writeOffPayments = user?.payments.filter((x) => x.type === "WRITEOFF");

  const paymentsToRender =
    selectedRenderPaymentsType === "REPLACEMENT"
      ? replacementPayments
      : selectedRenderPaymentsType === "WRITEOFF"
      ? writeOffPayments
      : user?.payments;

  const groupedPayments =
    paymentsToRender &&
    paymentsToRender.reduce((acc: any, payment) => {
      const paymentDate = new Date(
        payment.datetimeCreated
      ).toLocaleDateString();
      if (!acc[paymentDate]) {
        acc[paymentDate] = [];
      }
      acc[paymentDate].push(payment);
      return acc;
    }, {});

  // Типизировать позже
  const paymentsData = Object.entries(groupedPayments)
    .map(([date, payments]: any) => ({
      date,
      payments,
    }))
    .sort((a, b) => {
      const dateA = a.date.split(".").reverse().join("");
      const dateB = b.date.split(".").reverse().join("");

      return dateB.localeCompare(dateA);
    });

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={gStyles.pageProfile}>
          <View style={gStyles.pageProfileSection}>
            <View style={gStyles.pageWalletWpapper}>
              <ImageBackground
                resizeMode="stretch"
                style={gStyles.menuWrapperWalletImgBack}
                source={require("../../../assets/images/menu/wallet-back.png")}
              ></ImageBackground>
              <View style={gStyles.menuWalletInfoBox}>
                <Text style={gStyles.menuWalletInfoTitle}>Кошелёк</Text>
                <View style={gStyles.menuWalletInfoMoney}>
                  <Text style={gStyles.menuWalletMonneyValue}>
                    {user?.balance.toFixed()}
                  </Text>
                  <Image
                    style={gStyles.menuWalletIconRub}
                    source={require("../../../assets/images/menu/rub-w.png")}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={mzStyles.BtnOk}
              onPress={() => router.push("/(app)/wallet/top-up-balance")}
            >
              <Text style={mzStyles.BtnOkTxt}>Пополнить баланс</Text>
            </TouchableOpacity>
          </View>

          <View style={gStyles.pageProfileSection}>
            <Text style={gStyles.pagePTitle}>Способы оплаты</Text>

            {user?.paymentMethods.length === 0 ? (
              <View style={gStyles.pageWalletPayMethodStub}>
                <View style={gStyles.pageWalletPayStubMess}>
                  <Image
                    style={mzStyles.ModIconInfo}
                    source={require("../../../assets/images/info-modal.png")}
                  />
                  <View style={mzStyles.ZnakModIconTxt}>
                    <Text style={mzStyles.subTitleAlertDesc}>
                      У вас нет привязанных способов оплаты
                    </Text>
                  </View>
                </View>
                <Text style={mzStyles.subTitle}>
                  Чтобы прокатиться, нужно расплатиться))
                </Text>
              </View>
            ) : (
              <View style={gStyles.pageProfileUserData}>
                {user?.paymentMethods
                  .filter((payment) => payment.cardFirstSix !== null)
                  .map((payment, index) => (
                    <Fragment key={payment.id}>
                      <TouchableOpacity
                        style={gStyles.pageProfileUserItem}
                        onPress={() => handleSetPaymentMethod(payment.id)}
                      >
                        <View style={gStyles.pageWalletPayData}>
                          <View style={gStyles.payMethodIconBox}>
                            <Image
                              style={gStyles.payMethodIcon}
                              source={setPaymentMethodImage(payment)}
                              resizeMode="contain"
                            />
                          </View>
                          <View style={gStyles.pageProfileUserItemData}>
                            <Text style={gStyles.pagePDescr}>
                              {payment.cardType}
                            </Text>
                            <Text style={gStyles.pagePName}>
                              * {payment.cardLastFour}
                            </Text>
                          </View>
                        </View>
                        <View>
                          {/* <Text>Radio</Text> */}
                          <RadioButton
                            id={payment.id.toString()}
                            selected={
                              selected === payment.id.toString() ? true : false
                            }
                          />
                        </View>
                      </TouchableOpacity>

                      {payment.id !== lastPayment?.id ? (
                        <View style={gStyles.pageItemLine}></View>
                      ) : null}
                    </Fragment>
                  ))}

                {/* <TouchableOpacity style={gStyles.pageProfileUserItem}>
                            <View style={gStyles.pageWalletPayData}>
                                <View style={gStyles.payMethodIconBox}>
                                    <Image
                                        style={gStyles.payMethodIcon}
                                        source={require("../../assets/images/pay-method/mir.png")}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={gStyles.pageProfileUserItemData}>
                                    <Text style={gStyles.pagePDescr}>МИР</Text>
                                        <Text style={gStyles.pagePName}>* 3589</Text>
                                </View>
                            </View>


                            <View>
                                <Text>Radio</Text>
                            </View>
                        </TouchableOpacity> */}
              </View>
            )}

            <TouchableOpacity
              style={gStyles.btnPayMethod}
              onPress={openPaymentMethodBottomSheet}
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

          <View style={gStyles.pageProfileSection}>
            <Text style={gStyles.pagePTitle}>Платежи</Text>
            {/* Заглушка, когда нет платежей */}
            {user && user.payments.length === 0 ? (
              <Text style={mzStyles.subTitle}>Пока нет ни одного платежа</Text>
            ) : null}
            {/* end Заглушка, когда нет платежей */}
            {user && user.payments.length > 0 ? (
              <View style={gStyles.tabsPayHistory}>
                <TouchableOpacity
                  style={
                    selectedRenderPaymentsType === "ALL"
                      ? gStyles.tabsPayHistoryBtnActive
                      : gStyles.tabsPayHistoryBtn
                  }
                  onPress={() => setSelectedRenderPaymentsType("ALL")}
                >
                  <Text
                    style={
                      selectedRenderPaymentsType === "ALL"
                        ? gStyles.tabsPayHistoryBtnTxtActive
                        : gStyles.tabsPayHistoryBtnTxt
                    }
                  >
                    Все
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedRenderPaymentsType === "REPLACEMENT"
                      ? gStyles.tabsPayHistoryBtnActive
                      : gStyles.tabsPayHistoryBtn
                  }
                  onPress={() => setSelectedRenderPaymentsType("REPLACEMENT")}
                >
                  <Text
                    style={
                      selectedRenderPaymentsType === "REPLACEMENT"
                        ? gStyles.tabsPayHistoryBtnTxtActive
                        : gStyles.tabsPayHistoryBtnTxt
                    }
                  >
                    Пополнения
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedRenderPaymentsType === "WRITEOFF"
                      ? gStyles.tabsPayHistoryBtnActive
                      : gStyles.tabsPayHistoryBtn
                  }
                  onPress={() => setSelectedRenderPaymentsType("WRITEOFF")}
                >
                  <Text
                    style={
                      selectedRenderPaymentsType === "WRITEOFF"
                        ? gStyles.tabsPayHistoryBtnTxtActive
                        : gStyles.tabsPayHistoryBtnTxt
                    }
                  >
                    Списания
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {/* Вывод платежей */}

            <View style={gStyles.payHistoryWrapper}>
              <FlatList
                data={paymentsData}
                keyExtractor={(item) => item.date}
                renderItem={PaymentItem}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BottomSheet Add PaymentMethod */}

      <BottomSheet
        containerStyle={{
          marginTop: top,
        }}
        ref={paymentMethodBottomSheetRef}
        index={-1}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: "#CACACA",
          width: 36,
          height: 4,
        }}
        handleHeight={0}
        backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
        handleStyle={{ padding: 6 }}
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
      >
        <BottomSheetScrollView>
          <AddPaymentMethod />
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const ShadowCard = {
  param: {
    distance: 10,
    startColor: "#ffffff99",
    offset: [-9, -2],
  } as ShadowProps,
};
