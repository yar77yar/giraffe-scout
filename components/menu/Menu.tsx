import React, { FC, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";
import gStyles from "@/styles/style";
import { router } from "expo-router";
import { useUserStore } from "@/stores/user-store";

type Props = {
  openInfoSheet: () => void;
  closeInfoSheet: () => void;
};

const Menu: FC<Props> = ({ openInfoSheet, closeInfoSheet }) => {
  // Внешние ссылки
  // Ссылка для группы Поддержки клиентов в Телеграм
  const telegramSupportLink = "https://t.me/Jartaip";
  const openTelegramSupport = () => {
    Linking.openURL(telegramSupportLink);
  };
  // Ссылка для Сообщества в ВК
  const vkCommunityLink = "https://vk.com/id94719582";
  const openVkCommunity = () => {
    Linking.openURL(vkCommunityLink);
  };
  // Ссылка для Сообщества в Telegram
  const tgCommunityLink = "https://t.me/Jartaip";
  const openTgCommunity = () => {
    Linking.openURL(tgCommunityLink);
  };
  // Ссылка на сайт фирмы
  const siteLink = "https://giraffe-go.ru/";
  const openSite = () => {
    Linking.openURL(siteLink);
  };
  // end Внешние ссылки

  const user = useUserStore((state) => state.user);

  return (
    <ScrollView>
      <Pressable style={gStyles.menuContainer} onTouchStart={closeInfoSheet}>
        {/* <View style={gStyles.lineModSwipeBox}>
      <View style={gStyles.lineModSwipe}></View>
    </View> */}
        {/* Профиль карточка */}
        <Shadow
          {...ShadowCardProfile.param}
          style={{ alignSelf: "stretch" }}
          // style={{width:'100%', height:'100%'}}
        >
          <TouchableOpacity
            style={gStyles.menuWrapperProfile}
            onPress={() => router.push("/(app)/profile/")}
          >
            <Image
              style={gStyles.menuProfileIconSmile}
              source={require("../../assets/images/menu/smile.png")}
            />
            <View style={gStyles.menuProfileInfoBox}>
              <Text style={gStyles.menuInfoTitleW}>Профиль</Text>
              <Text style={gStyles.menuProfileInfoTel}>{user?.phone}</Text>
            </View>
            <View style={gStyles.menuProfileHelloBox}>
              <Text style={gStyles.menuProfileHelloTxt}>Привет</Text>
              <Text style={gStyles.menuProfileHelloTxt}>
                , {user?.name ? user.name : "Неизвестный"}
              </Text>
              <Text style={gStyles.menuProfileHelloTxt}>!</Text>
            </View>
          </TouchableOpacity>
        </Shadow>
        {/* end Профиль карточка */}

        {/* Блок - Промокод, Подписки */}
        {/* Промокод */}
        <View style={gStyles.menuPPBox}>
          <TouchableOpacity
            style={{ flex: 1, width: "40%" }}
            onPress={() => router.push("/(app)/promocodes")}
          >
            <LinearGradient
              colors={["#AAE63F80", "#FDDA3070"]}
              // colors={['#dbf53c', '#cfe82a']}
              // colors={['#3ECAF6', '#3b5998', '#3ECAF6']}
              style={gStyles.menuWrapperPromo}
              start={{ x: 0, y: 0 }}
              // end={{x:5, y:5}}
            >
              <Image
                style={gStyles.menuPromoIconMegaphone}
                source={require("../../assets/images/menu/promo-megaphone.png")}
              />
              <Image
                style={gStyles.menuPromoIconPercent}
                source={require("../../assets/images/menu/promo-percent.png")}
              />
              <View style={gStyles.menuPromoInfo}>
                <Text style={gStyles.menuInfoTitleB}>Промокоды</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Подписки */}
          <TouchableOpacity
            style={{ flex: 1, height: "110%" }}
            onPress={() => router.push("/(app)/subscriptions")}
          >
            <Shadow
              {...ShadowCard.param}
              style={{ width: "100%", height: "100%" }}
            >
              <LinearGradient
                style={gStyles.menuWrapperPass}
                // colors={['#3ECAF6', '#ff5478']}
                colors={["#37323290", "#373232"]}
                // colors={['#3ECAF6', '#3b5998', '#3ECAF6']} 373232
                start={{ x: 3, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Image
                  style={gStyles.menuPassIconStart}
                  source={require("../../assets/images/menu/start-0.png")}
                />
                <View style={gStyles.menuPassInfo}>
                  <Text style={gStyles.menuInfoTitleW}>Подписки</Text>
                  <Text style={gStyles.menuInfoDescW}>
                    С подписками выгоднее!
                  </Text>
                </View>
              </LinearGradient>
            </Shadow>
          </TouchableOpacity>
        </View>
        {/* end Блок - Промокод, Подписки */}

        {/* Кошелек карточка */}
        <TouchableOpacity
          style={gStyles.menuWrapperWallet}
          onPress={() => router.push("/(app)/wallet/")}
        >
          <ImageBackground
            resizeMode="stretch"
            style={gStyles.menuWrapperWalletImgBack}
            source={require("../../assets/images/menu/wallet-back.png")}
          ></ImageBackground>
          <View style={gStyles.menuWalletInfoBox}>
            <Text style={gStyles.menuWalletInfoTitle}>Кошелёк</Text>
            <View style={gStyles.menuWalletInfoMoney}>
              <Text style={gStyles.menuWalletMonneyValue}>
                {user?.balance.toFixed()}
              </Text>
              <Image
                style={gStyles.menuWalletIconRub}
                source={require("../../assets/images/menu/rub-w.png")}
              />
            </View>
          </View>
        </TouchableOpacity>
        {/* end Кошелек карточка */}

        {/* Блок - Помощь, Как это работает */}
        <View style={gStyles.menuHelpGuidBox}>
          {/* Как это работает */}
          <TouchableOpacity style={{ flex: 1 }}>
            <Shadow
              {...ShadowCard.param}
              style={{ width: "100%", height: "100%" }}
            >
              <View style={gStyles.menuWrapperGuid}>
                <ImageBackground
                  resizeMode="cover"
                  style={gStyles.menuWrapperGuidImgBack}
                  source={require("../../assets/images/menu/guid-back.png")}
                ></ImageBackground>
                <View style={gStyles.menuGuidInfoBox}>
                  <Text style={gStyles.menuGuidInfoTxt}>Как это работает?</Text>
                </View>
              </View>
            </Shadow>
          </TouchableOpacity>
          {/* Поддержка */}
          <Pressable
            onPress={openTelegramSupport}
            style={({ pressed }) => [gStyles.f1, pressed && { opacity: 0.4 }]}
          >
            <Shadow
              {...ShadowCard.param}
              style={{ width: "100%", height: "100%" }}
            >
              <LinearGradient
                colors={["#3ECAF6", "#3ECAF6"]}
                // colors={['#3ECAF6', '#3b5998', '#3ECAF6']}
                style={gStyles.menuWrapperHelp}
                // start={{x:0, y:0}}
                // end={{x:1, y:1}}
              >
                <Image
                  style={gStyles.menuHelpIconTg}
                  source={require("../../assets/images/menu/help-tg.png")}
                />
                <View style={gStyles.menuHelpInfo}>
                  <Text style={gStyles.menuInfoDescB}>
                    Напишите нам в Telegram
                  </Text>
                  <Text style={gStyles.menuInfoTitleB}>Поддержка</Text>
                </View>
              </LinearGradient>
            </Shadow>
          </Pressable>
        </View>
        {/* end Блок - Помощь, Как это работает */}

        {/* История поездок - карточка */}
        <Shadow {...ShadowCard.param} style={{ alignSelf: "stretch" }}>
          <TouchableOpacity
            style={gStyles.menuWrapperHtrip}
            onPress={() => router.push("/(app)/trip-history")}
          >
            <Image
              style={gStyles.menuHtripIconRoad}
              source={require("../../assets/images/menu/trip-route.png")}
            />
            <Text style={gStyles.menuInfoTitleW}>История поездок</Text>
          </TouchableOpacity>
        </Shadow>
        {/* end История поездок - карточка */}

        {/* О приложении карточка */}
        <View style={gStyles.menuWrapperApp}>
          <View style={gStyles.menuWrapperAppInfoBox}>
            <Image
              style={gStyles.menuWrapperAppLogo}
              source={require("../../assets/images/menu/logo.png")}
            />
            <Text style={gStyles.menuWrapperAppVers}>Версия 0.24.1</Text>
          </View>
          <View style={gStyles.menuWrapperAppSocBox}>
            <Shadow {...ShadowSoc.param}>
              {/* ВК */}
              <TouchableOpacity
                style={gStyles.menuWrapperAppSocItem}
                onPress={openVkCommunity}
              >
                <Image
                  style={gStyles.menuAppIconSoc}
                  source={require("../../assets/images/soc/vk.png")}
                />
              </TouchableOpacity>
            </Shadow>
            {/* Telegram */}
            <Shadow {...ShadowSoc.param}>
              <TouchableOpacity
                style={gStyles.menuWrapperAppSocItem}
                onPress={openTgCommunity}
              >
                <Image
                  style={gStyles.menuAppIconSoc}
                  source={require("../../assets/images/soc/tg.png")}
                />
              </TouchableOpacity>
            </Shadow>
            {/* Сайт фирмы */}
            <Shadow {...ShadowSoc.param}>
              <TouchableOpacity
                style={gStyles.menuWrapperAppSocItem}
                onPress={openSite}
              >
                <Image
                  style={gStyles.menuAppIconSoc}
                  source={require("../../assets/images/soc/web.png")}
                />
              </TouchableOpacity>
            </Shadow>
          </View>

          <TouchableOpacity onPress={openInfoSheet}>
            <Text style={gStyles.menuWrapperAppLaw}>
              Юридическая информация
            </Text>
          </TouchableOpacity>
        </View>
        {/* </Shadow> */}
        {/* end О приложении карточка */}
      </Pressable>

      {/* <BottomSheet
        containerStyle={{
          // marginTop: insets.top,
          // marginBottom: insets.bottom,
          backgroundColor: "#000",
          zIndex: 10,
          position: "absolute",
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
        // handleStyle={{ display: "none" }}
      >
        <BottomSheetScrollView>
          <Text>123</Text>
          <Text>123</Text>
          <Text>123</Text>
          <Text>123</Text>
          <Text>123</Text>
          <Text>123</Text>
        </BottomSheetScrollView>
      </BottomSheet> */}
    </ScrollView>
  );
};

const ShadowCard = {
  param: {
    distance: 3,
    startColor: "#00000055",
    offset: [1, 1],
  } as ShadowProps,
};
const ShadowCardProfile = {
  param: {
    distance: 3,
    startColor: "#75528c45",
    offset: [0, 1],
  } as ShadowProps,
};
const ShadowSoc = {
  param: {
    distance: 3,
    startColor: "#00000010",
    offset: [0, 1],
  } as ShadowProps,
};

export default Menu;
