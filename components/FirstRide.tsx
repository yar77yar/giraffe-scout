import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import gStyles from "../styles/style";

const FirstRide = () => {
  return (
    <>
      {/* Предложение для первой поездки-Настройка */}
      <View style={gStyles.firstRideOffer}>
        <View style={gStyles.offer}>
          <Image
            style={gStyles.tapOfferIcon}
            source={require("../assets/images/hand-tap.png")}
          />
        </View>
        <View style={gStyles.offer}>
          <Text style={gStyles.title}>Похоже, это ваша первая поездка</Text>
          <Text style={gStyles.desc}>
            Нажмите, чтобы настроить и быть готовым
          </Text>
        </View>
      </View>
    </>
  );
};

export default FirstRide;
