import React, { useState, useRef, useEffect, Component } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import { TextInputMask } from 'react-native-masked-text'

export default function ScooterCode() {
  const { top } = useSafeAreaInsets();


  const [international, setInternational] = useState('');
  const inputRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.getElement().focus();
    }
  }, []);

  const handleInputChange = (text) => {
    setInternational(text);
    setIsFilled(text.length > 6);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 86 : 96} // Компенсация для верхнего заголовка (если есть)
    >
      <View style={gStyles.pageRefill}>
        <View style={gStyles.pageProfile}>
          <View style={gStyles.pageAuthWrapper}>
            {/* <Text style={gStyles.pagePTitle}>Как вас зовут?</Text> */}
            <Text style={gStyles.pageAuthTitle}>Введите номер самоката</Text>

            <View style={styles.containerCode}>

              <View
                style={[styles.wrapperCode, isFilled && styles.filledPhoneNumber]}  
              >

                <View style={styles.boxInputPhone}>
                  <TextInputMask
                    ref={inputRef}
                    type={'custom'}
                    options={{
                      mask: '999-999'
                    }}
                    value={international}
                    onChangeText={handleInputChange}
                    // onChangeText={text => {
                    //   setInternational(text);
                    // }}
                    textAlignVertical="center"
                    textAlign="center"
                    style={styles.inputPhone}
                    keyboardType="numeric"
                    placeholder="000-000"
                  />
                </View>
              </View>
            </View>
            <Text style={gStyles.pageAuthDesc}>
              Самокат с таким номером не найден. Попробуйте ещё раз.
            </Text>
            <Text style={gStyles.pageAuthDesc}>
              Расстояние до самоката слишком большое. Выберите самокат поближе.
            </Text>
          </View>
        </View>

        <View style={gStyles.pageAuthBtnBox}>
          <TouchableOpacity
            style={[mzStyles.BtnOk, !isFilled && styles.disabledBtn]}
            disabled={!isFilled}
          >
            <Text style={mzStyles.BtnOkTxt}>Найти</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerCode:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wrapperCode:{
    // flex: 1,
    padding: 8,
    // backgroundColor: '#F2F4F6',
    borderWidth: 2,
    borderColor: '#FEC303',
    borderRadius: 12,
    height: 60,
    width: 200,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  boxInputPhone:{
    flex: 1,
    // width: '100%',
    // minWidth: 2,
    // display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',

  },
  
  inputPhone:{
    // flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 60,
    // alignSelf: 'stretch',
    width: '100%',
    // minWidth: 2,
    fontSize: 24,
    fontWeight: '700',
    // backgroundColor: 'green'
    // backgroundColor: 'transparent'
  },
  placeholder: {
    position: 'absolute',
    top: 9,
    left: 0,
    fontSize: 18,
    fontWeight: '600',
    color: '#B5ADAD',
  },
  linkBlue:{
    color: '#1882FF',
    borderBottomWidth: 1,
    borderColor: '#1882FF',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  filledPhoneNumber: {
    backgroundColor: '#F2F4F6',
    borderWidth: 0, 
  },
});