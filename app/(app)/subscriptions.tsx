import React, { useEffect, useRef, useState } from "react";
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
  Switch,
  SwitchChangeEvent,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import subscriptionService from "@/services/subscription.service";
import { useSubscriptionStore } from "@/stores/subscription-store";
import { ISubscription } from "@/interfaces/subscription/subscription.interface";
import { useUserStore } from "@/stores/user-store";
import SubscriptionContent from "@/components/subscription/SubscriptionContent";
import dateConverter from "@/utils/date-converter";
import request from "axios";
import Toast from "react-native-toast-message";
// import { RadioButton } from 'react-native-radio-buttons-group';

export default function SubscriptonsPage() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { subscriptions, setSubscriptions } = useSubscriptionStore();
  const { user, updateUserField } = useUserStore();

  const [isAutoPaymentEnabled, setIsAutoPaymentEnabled] = useState<boolean>(
    user?.subscriptionsOptions?.autoPayment || false
  );

  const [selectedSubscription, setSelectedSubscription] =
    useState<ISubscription | null>();

  const yourInputRef = useRef(null);

  const openBottomSheet = (item: ISubscription) => {
    bottomSheetRef.current?.expand();
    setSelectedSubscription(item);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setSelectedSubscription(null);
  };

  const insets = useSafeAreaInsets();

  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");

  // Табуляция
  const [activeTab, setActiveTab] = useState(0);
  const handleTabPress = (index: number) => {
    setActiveTab(index);
    // Дополнительная логика, связанная с изменением таба
  };

  useEffect(() => {
    (async () => {
      const subscriptions = await subscriptionService.getAll();
      setSubscriptions(subscriptions);
    })();
  }, []);

  const activeSubscription = subscriptions.find(
    (x) => x.id === user?.subscriptionsOptions?.subscriptionId
  );

  const updateSubscriptionAutoPaymentStatus = async () => {
    if (!user) {
      return;
    }

    if (!user.subscriptionsOptions) {
      return;
    }

    try {
      const response = await subscriptionService.updateOptions(
        user.subscriptionsOptions.id,
        { autoPayment: isAutoPaymentEnabled ? false : true }
      );

      setIsAutoPaymentEnabled(response.autoPayment);

      updateUserField("subscriptionsOptions", response);

      Toast.show({
        type: "success",
        text1: !isAutoPaymentEnabled
          ? "Автопродление включено"
          : "Автопродление отключено",
      });
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        Toast.show({
          type: "error",
          text1: err.response.data.message,
        });
      }
      setIsAutoPaymentEnabled(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ height: "100%" }}>
      <View style={gStyles.pageRefill}>
        <View style={gStyles.pageProfile}>
          <View style={gStyles.pageProfileSection}>
            <View style={gStyles.passCardTabsBox}>
              <TouchableOpacity
                style={[
                  gStyles.passCardTabs,
                  activeTab === 0 && gStyles.passCardTabsActive,
                ]}
                onPress={() => handleTabPress(0)}
              >
                <Text
                  style={[
                    gStyles.passCardTabsTxt,
                    activeTab === 0 && gStyles.passCardTabsTxtActive,
                  ]}
                >
                  Предложения
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  gStyles.passCardTabs,
                  activeTab === 1 && gStyles.passCardTabsActive,
                ]}
                onPress={() => handleTabPress(1)}
              >
                <Text
                  style={[
                    gStyles.passCardTabsTxt,
                    activeTab === 1 && gStyles.passCardTabsTxtActive,
                  ]}
                >
                  Мои подписки
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab === 0 && (
              // <Text style={gStyles.pagePTitle}>Выбери свою</Text>

              <View style={gStyles.passCardListBox}>
                {/* Карточка подписки */}

                {subscriptions.map((subscription) => (
                  <TouchableOpacity
                    onPress={() => openBottomSheet(subscription)}
                    key={subscription.id}
                  >
                    <Shadow
                      {...ShadowCard.param}
                      style={{ alignSelf: "stretch" }}
                    >
                      <LinearGradient
                        style={gStyles.passCardWrapper}
                        colors={["#37323290", "#373232"]}
                        start={{ x: 3, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <View style={gStyles.passCardNamePrice}>
                          <Text style={gStyles.passCardName}>
                            На {subscription.days} дней
                          </Text>
                          <View style={gStyles.passCardPriceBox}>
                            <Text style={gStyles.passCardPrice}>
                              {subscription.price}
                            </Text>
                            <Image
                              style={gStyles.passCardIconRub}
                              resizeMode="contain"
                              source={require("../../assets/images/rub-b.png")}
                            />
                          </View>
                        </View>

                        <Image
                          style={gStyles.passCardIconStart}
                          source={require("../../assets/images/menu/start-0.png")}
                        />
                        <Image
                          style={gStyles.passCardIconBlur}
                          source={require("../../assets/images/pass/blur-radius.png")}
                        />

                        <Image
                          style={gStyles.passCardIconRoad}
                          resizeMode="contain"
                          source={require("../../assets/images/pass/r1.png")}
                        />
                      </LinearGradient>
                    </Shadow>
                  </TouchableOpacity>
                ))}

                {/* <TouchableOpacity onPress={openBottomSheet}>
                            <Shadow {...ShadowCard.param}
                                    style={{alignSelf: 'stretch' }}
                                >
                                <LinearGradient
                                    style={gStyles.passCardWrapper}
                                    colors={['#37323290', '#373232']}
                                    start={{x:3, y:0}}
                                    end={{x:1, y:1}}
                                >
                                    <View style={gStyles.passCardNamePrice}>
                                        <Text style={gStyles.passCardName}>На месяц</Text>
                                        <View style={gStyles.passCardPriceBox}>
                                            <Text style={gStyles.passCardPrice}>499</Text>
                                            <Image
                                                style={gStyles.passCardIconRub}
                                                resizeMode="contain"
                                                source={require("../../assets/images/rub-b.png")}
                                            />
                                        </View>
                                    </View>

                                    <Image
                                        style={gStyles.passCardIconStart}
                                        source={require("../../assets/images/menu/start-0.png")}
                                    />
                                    <Image
                                        style={gStyles.passCardIconBlur}
                                        
                                        source={require("../../assets/images/pass/blur-radius.png")}
                                    />
                                    <Image
                                        style={gStyles.passCardIconRoad}
                                        resizeMode="contain"
                                        source={require("../../assets/images/pass/r2.png")}
                                    />
                                </LinearGradient>
                            </Shadow>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openBottomSheet}>
                            <Shadow {...ShadowCard.param}
                                    style={{alignSelf: 'stretch' }}
                                >
                                <LinearGradient
                                    style={gStyles.passCardWrapper}
                                    colors={['#37323290', '#373232']}
                                    start={{x:3, y:0}}
                                    end={{x:1, y:1}}
                                >
                                    <View style={gStyles.passCardNamePrice}>
                                        <Text style={gStyles.passCardName}>На 3 месяца</Text>
                                        <View style={gStyles.passCardPriceBox}>
                                            <Text style={gStyles.passCardPrice}>999</Text>
                                            <Image
                                                style={gStyles.passCardIconRub}
                                                resizeMode="contain"
                                                source={require("../../assets/images/rub-b.png")}
                                            />
                                        </View>
                                    </View>

                                    <Image
                                        style={gStyles.passCardIconStart}
                                        source={require("../../assets/images/menu/start-0.png")}
                                    />
                                    <Image
                                        style={gStyles.passCardIconBlur}
                                        
                                        source={require("../../assets/images/pass/blur-radius.png")}
                                    />
                                    <Image
                                        style={gStyles.passCardIconRoad}
                                        resizeMode="contain"
                                        source={require("../../assets/images/pass/r3.png")}
                                    />
                                </LinearGradient>
                            </Shadow>
                        </TouchableOpacity> */}

                {/* end Карточка подписки */}
              </View>
            )}

            {/* Контент для второго таба (Мои подписки) */}
            {activeTab === 1 && (
              // Заглушка ниже, сперва подписка
              <>
                {user && activeSubscription ? (
                  <View
                  // onPress={() => openBottomSheet(subscription)}
                  // key={subscription.id}
                  >
                    <View
                    //   {...ShadowCard.param}
                    //   style={{ alignSelf: "stretch" }}
                    >
                      <LinearGradient
                        style={gStyles.passCardWrapper}
                        colors={["#37323290", "#373232"]}
                        start={{ x: 3, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <View style={gStyles.passCardNamePrice}>
                          <Text style={gStyles.passCardName}>
                            На {activeSubscription?.days} дней
                          </Text>
                          <View style={gStyles.passCardPriceBox}>
                            <Text style={gStyles.passCardPrice}>
                              {activeSubscription?.price}
                            </Text>
                            <Image
                              style={gStyles.passCardIconRub}
                              resizeMode="contain"
                              source={require("../../assets/images/rub-b.png")}
                            />
                          </View>
                        </View>

                        <Image
                          style={gStyles.passCardIconStart}
                          source={require("../../assets/images/menu/start-0.png")}
                        />
                        <Image
                          style={gStyles.passCardIconBlur}
                          source={require("../../assets/images/pass/blur-radius.png")}
                        />

                        <Image
                          style={gStyles.passCardIconRoad}
                          resizeMode="contain"
                          source={require("../../assets/images/pass/r1.png")}
                        />
                      </LinearGradient>
                      <View style={gStyles.passCardPocketBox}>
                        <View style={gStyles.passCardPocketItem}>
                          <Text style={gStyles.passCardPocketItemTxt}>
                            Начало
                          </Text>
                          <Text style={gStyles.passCardPocketItemTxt}>
                            {dateConverter.getFormattedDate(
                              user.subscriptionsOptions?.purchaseDate
                            )}
                          </Text>
                        </View>
                        <View style={gStyles.passCardPocketItem}>
                          <Text style={gStyles.passCardPocketItemTxt}>
                            Завершение
                          </Text>
                          <Text style={gStyles.passCardPocketItemTxt}>
                            {dateConverter.getFormattedDate(
                              user.subscriptionsOptions?.expDate
                            )}
                          </Text>
                        </View>

                        <View
                          style={[
                            gStyles.passCardPocketItem,
                            gStyles.passCardPocketPtb,
                          ]}
                        >
                          <Text style={gStyles.passCardPocketItemTxtBold}>
                            Автопродление
                          </Text>
                          <Text style={gStyles.passCardPocketItemTxt}>
                            <Switch
                              trackColor={{ false: "#767577", true: "#81b0ff" }}
                              thumbColor={
                                isAutoPaymentEnabled ? "#f5dd4b" : "#f4f3f4"
                              }
                              ios_backgroundColor="#3e3e3e"
                              value={isAutoPaymentEnabled}
                              onValueChange={
                                updateSubscriptionAutoPaymentStatus
                              }
                            />
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={gStyles.passCardNopassBox}>
                    <Text style={gStyles.passCardNopassTitle}>
                      У вас нет активных подписок
                    </Text>
                    <Image
                      style={gStyles.passCardNopassIcon}
                      source={require("../../assets/images/pass/no-pass.png")}
                    />
                  </View>
                )}
              </>
              // end Заглушка, если нет подписок
            )}
          </View>
        </View>
      </View>

      <BottomSheet
        containerStyle={{
          marginTop: insets.top,
          // flex: 1,
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
        onClose={() => setSelectedSubscription(null)}
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
          <SubscriptionContent
            selectedSubscription={selectedSubscription}
            close={closeBottomSheet}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const ShadowCard = {
  param: {
    distance: 3,
    startColor: "#00000055",
    offset: [1, 1],
  } as ShadowProps,
};
