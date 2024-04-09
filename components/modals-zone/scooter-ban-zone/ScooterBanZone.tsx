import React, { useState, useEffect, FC } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import mzStyles from "../../../styles/mod-zone-style";

type Props = {
  close: () => void;
};

const ScooterBanZone: FC<Props> = ({ close }) => {
  return (
    <>
      {/* Предложение для первой поездки-Настройка */}
      <View style={mzStyles.mzContainer}>
        <View style={mzStyles.mzBoxOne}>
          <View style={mzStyles.mzWrapperOne}>
            <View style={mzStyles.lineModSwipe}></View>
            <View style={mzStyles.ZoneModHeadBox}>
              <Image
                style={mzStyles.ZnakModIcon}
                source={require("../../../assets/images/zone-in-modal/scooter-ban-zone.png")}
              />
              <Text style={mzStyles.h5Headung}>Зона запрета самокатов</Text>
              <Text style={mzStyles.subTitle}>Круглосуточно</Text>
            </View>
            <View style={mzStyles.ZoneModDescrBox}>
              <Image
                style={mzStyles.ModIconInfo}
                source={require("../../../assets/images/info-modal.png")}
              />
              <View style={mzStyles.ZnakModIconTxt}>
                <Text style={mzStyles.subTitleAlertDesc}>
                  Здесь запрещено кататься. Наслаждайтесь остальной частью
                  города
                </Text>
              </View>
            </View>
          </View>

          <View style={mzStyles.BtnBox}>
            <Pressable style={mzStyles.BtnOk} onPress={close}>
              <Text style={mzStyles.BtnOkTxt}>Хорошо!</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default ScooterBanZone;
