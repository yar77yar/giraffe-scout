import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import gStyles from "../../styles/style";

const FirstRideCopy = () => {
  return (
    <>
      {/* Предложение для первой поездки-Настройка */}
      <View style={gStyles.alertBoxMess}>
        <Image
          style={gStyles.tapOfferIcon}
          source={require("../../assets/images/ride/stop.png")}
        />
        <View style={gStyles.alertWrapperTxt}>
          <Text style={gStyles.alertBoxTxtW}>
            Здесь кататься запрещено, пожалуйста вернитесь в светлую зону
          </Text>
        </View>
      </View>
    </>
  );
};

export default FirstRideCopy;

const styles = StyleSheet.create({
    // !!! === Предложение для первой поездки-Настройка
    
  
});