import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import gStyles from "../../styles/style";

const ActionBtnMap = () => {
  return (
    <>
      {/* Кнопки Сканер/Навигация */}
      <View style={gStyles.btnActionWrapper}>
        <View style={gStyles.myGeoBtn}>
          <View style={gStyles.box}>
            <Image
              style={gStyles.myGeoBtnIcon}
              source={require("../../assets/images/geo-user.png")}
            />
          </View>
        </View>
        <TouchableOpacity style={gStyles.qrBtn}>
          <View style={gStyles.box}>
            <Image
              style={gStyles.qrBtnIcon}
              source={require("../../assets/images/qr-btn.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ActionBtnMap;
