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

const OutOfZone: FC<Props> = ({ close }) => {
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
                source={require("../../../assets/images/zone-in-modal/out-of-zone.png")}
              />
              <Text style={mzStyles.h5Headung}>Здесь сервис не работает</Text>
              <Text style={mzStyles.subTitle}>
                Но возможно когда нибудь будет. Пожалйста оставайтесь в светлой
                зоне
              </Text>
            </View>
            {/* <View style={mzStyles.ZoneModDescrBox}>
                        <Image style={mzStyles.ModIconInfo} source={require('../../../img/info-modal.png')} />
                        <View style={mzStyles.ZnakModIconTxt}>
                            <Text style={mzStyles.subTitle}>Здесь нельзя парковаться и оставлять самокаты, даже не надолго</Text>
                        </View>
                    </View> */}
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

export default OutOfZone;
