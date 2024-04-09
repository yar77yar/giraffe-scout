import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Pressable,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import tripService from "@/services/trip.service";
import { useScooterStore } from "@/stores/scooter-store";
import { useTripProcessStore } from "@/stores/trip-process.store";
import { router } from "expo-router";

export default function TariffPage() {
  const { top } = useSafeAreaInsets();

  const { selectedScooter } = useScooterStore();
  const { setTrip } = useTripProcessStore();

  const startTrip = async () => {
    if (!selectedScooter) {
      Alert.alert("Нет выбранного скутера");
      return;
    }

    try {
      const res = await tripService.start(selectedScooter.scooter.deviceId, 1);
      setTrip(res);
      router.replace("/(app)");
    } catch (err) {
      Alert.alert("Не удалось начать поездку");
    }
  };

  return (
    <View
      style={{
        ...gStyles.f1,
        marginTop: top,
      }}
    >
      <ScrollView style={gStyles.pageTariffContainer}>
        <View style={gStyles.pageTariff}>
          <View
            style={[gStyles.pageTariffRentSection, gStyles.radiusBoxBottom]}
          >
            <View style={gStyles.ptrTariffBox}>
              <View
                style={{
                  ...gStyles.ptrTariffCard,
                  backgroundColor: "#EC1D68",
                }}
              >
                <Text style={gStyles.ptrTariffTxt}>Поминутный</Text>
              </View>

              <View style={gStyles.ptrTariffInfoCard}>
                <View style={gStyles.ptrTariffInfoStroke}>
                  <Text style={gStyles.ptrTariffInfoTitle}>Старт</Text>
                  <Text style={gStyles.ptrTariffInfoValue}>30 &#8381;</Text>
                </View>
                {/* Если есть подписка, то выводит этот блок */}
                {/* <View style={gStyles.ptrTariffInfoStroke}> 
                  <Text style={gStyles.ptrTariffInfoTitle}>Старт по подписке</Text>
                  <Text style={gStyles.ptrTariffInfoValue}>0 &#8381;</Text>
                </View> */}
                {/* end Если есть подписка, то выводит этот блок */}
                <View style={gStyles.ptrTariffInfoStroke}>
                  <Text style={gStyles.ptrTariffInfoTitle}>В поездке</Text>
                  <Text style={gStyles.ptrTariffInfoValue}>5 &#8381;/мин</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[gStyles.pageTariffRentSection, gStyles.radiusBoxQuad]}>
            <Text style={gStyles.pagePTitle}>Способ оплаты</Text>
            <View>
              <View style={gStyles.pageItemLine}></View>
              <TouchableOpacity style={gStyles.pageProfileUserItem}>
                {/* {user?.activePaymentMethod && activePaymentMethod ? ( */}
                <View style={gStyles.pageWalletPayData}>
                  <View style={gStyles.payMethodIconBox}>
                    <Image
                      style={gStyles.payMethodIcon}
                      source={require("../../assets/images/pay-method/visa.png")}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={gStyles.pageProfileUserItemData}>
                    <Text style={gStyles.pagePDescr}>
                      Visa {/* {activePaymentMethod?.cardType} */}
                    </Text>
                    <Text style={gStyles.pagePName}>
                      * 1111 {/* * {activePaymentMethod?.cardLastFour} */}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={gStyles.pageProfileIconArrow}
                    source={require("../../assets/images/arrow-upward.png")}
                  />
                </View>
              </TouchableOpacity>
              <View style={gStyles.pageItemLine}></View>
            </View>
            <Text style={gStyles.ptrInfoTxtMin}>
              В начале поездки заморозится 300&#8381; - это залог. В конце
              деньги вернуться, если поездка получится дешевле
            </Text>
          </View>

          {/* <View style={[gStyles.pageTariffRentSection, gStyles.radiusBoxQuad]}>
            <View>
              <TouchableOpacity
                style={gStyles.pageProfileUserItem}
              >
                  <View style={gStyles.pageWalletPayData}>
                    <View style={gStyles.payMethodIconBox}>
                      <Image
                        style={gStyles.payMethodIcon}
                        source={require("../../assets/images/pay-method/visa.png")}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={gStyles.pageProfileUserItemData}>
                      <Text style={gStyles.pagePName}>
                        Базовая страховка
                      </Text>
                      <Text style={gStyles.pagePDescr}>
                        Покрывает до 100 000&#8381;
                      </Text>
                    </View>
                  </View>
                <View>
                  <Image
                    style={gStyles.pageProfileIconArrow}
                    source={require("../../assets/images/arrow-upward.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View> */}

          {/* Блок - СТРАХОВКА */}
          <View style={[gStyles.pageTariffRentSection, gStyles.radiusBoxQuad]}>
            <Text style={gStyles.pagePTitle}>Страховка</Text>

            <View style={gStyles.ptrInsWrapper}>
              {/* Карточка страховки - Активная  */}
              <View style={gStyles.f1}>
                <Shadow
                  {...ShadowInsCardActive.param}
                  // {...ShadowInsCardNo.param} // Пустая тень, ставим на неактивный элемент
                  style={{ alignSelf: "stretch" }}
                >
                  <TouchableOpacity style={gStyles.ptrInsCard}>
                    <View style={gStyles.pageProfileUserItemData}>
                      <Text style={gStyles.pagePName}>Базовая - 0&#8381;</Text>
                      <Text style={gStyles.pagePDescr}>
                        Покрывает до {"\n"}100 000&#8381;
                      </Text>
                    </View>
                    <Image
                      style={gStyles.ptrInsIconAct}
                      source={require("../../assets/images/tariff/ins.png")}
                    />
                  </TouchableOpacity>
                </Shadow>
              </View>

              {/* Карточка страховки - НЕ Активная  */}
              <View
                style={{
                  ...gStyles.f1,
                  opacity: 0.7,
                }}
              >
                <Shadow
                  // {...ShadowInsCardActive.param}
                  {...ShadowInsCardNo.param} // Пустая тень, ставим на неактивный элемент
                  style={{ alignSelf: "stretch" }}
                >
                  <TouchableOpacity style={gStyles.ptrInsCard}>
                    <View style={gStyles.pageProfileUserItemData}>
                      <Text style={gStyles.pagePName}>Полная - 35&#8381;</Text>
                      <Text style={gStyles.pagePDescr}>
                        Покрывает до {"\n"}600 000&#8381;
                      </Text>
                    </View>
                    <Image
                      style={{
                        ...gStyles.ptrInsIconAct,
                        display: "none",
                      }}
                      source={require("../../assets/images/tariff/ins.png")}
                    />
                  </TouchableOpacity>
                </Shadow>
              </View>
            </View>
          </View>

          <View style={[gStyles.pageTariffRentSection, gStyles.radiusBoxQuad]}>
            <View style={gStyles.ptrPassBox}>
              <View style={gStyles.ptrPassBoxOfferWrapper}>
                <View style={gStyles.ptrPassBoxOffer}>
                  <Text style={gStyles.ptrPassBoxOfferTxt}>Хочешь</Text>
                  <View style={gStyles.yellowBorder}>
                    <Text style={gStyles.ptrPassBoxOfferTxtBold}>
                      0&#8381; за СТАРТ
                    </Text>
                  </View>
                  <Text style={gStyles.ptrPassBoxOfferTxt}>?</Text>
                </View>
                <Text style={gStyles.ptrPassBoxOfferTxt}>
                  Подключи подписку!
                </Text>
              </View>
              <TouchableOpacity style={gStyles.ptrPassBoxWrapperCard}>
                <LinearGradient
                  style={gStyles.ptrPassBoxCard}
                  colors={["#37323290", "#373232"]}
                  start={{ x: 3, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={gStyles.ptrPassBoxCardTitle}>
                    Выбрать подписку
                  </Text>
                  <Image
                    style={gStyles.passPopupAdvIcon}
                    source={require("../../assets/images/tariff/arrow-rig.png")}
                    resizeMode="contain"
                  />
                  <Image
                    style={gStyles.ptrPassIconStart}
                    source={require("../../assets/images/menu/start-0.png")}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              gStyles.pageTariffRentSection,
              gStyles.pageTariffRentSectionLast,
              gStyles.radiusBoxTop,
            ]}
          >
            <Text style={gStyles.ptrInfoTxtMin}>
              Нажимая кнопку “Поехали” , вы принимаете договор присоединения,
              соглашаетесь с условиями страхования, а также с ключевым
              информационным документом
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={[mzStyles.BtnBox, gStyles.downPos]}>
        <TouchableOpacity style={mzStyles.BtnOk} onPress={() => startTrip()}>
          <Text style={mzStyles.BtnOkTxt}>Поехали!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const ShadowInsCardActive = {
  param: {
    distance: 2,
    startColor: "#75528c30",
    offset: [0, 1],
  } as ShadowProps,
};
const ShadowInsCardNo = {
  param: {
    distance: 0,
    startColor: "#ffffff00",
    offset: [0, 0],
  } as ShadowProps,
};
