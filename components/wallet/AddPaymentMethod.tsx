import paymentService from "@/services/payment.service";
import gStyles from "@/styles/style";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

const AddPaymentMethod = () => {
  //   const handleAddPaymentMethod = async () => {
  //     const data = {
  //       userId: user?.id,
  //     };
  //     const payment = await paymentService.addPaymentMethod(data);

  //     if (!payment) {
  //       alert("Не получилось привязать карту");
  //     }

  //     setPaymentUrl(payment.payment.confirmation.confirmation_url);
  //     router.navigate("/(app)/payment");
  //     setIsAddPaymentMethod(false);
  //   };

  return (
    <View style={gStyles.pageProfileSection}>
      <View style={gStyles.payMethodSelectTitle}>
        {/* <TouchableOpacity onPress={() => setIsAddPaymentMethod(false)}>
        <View style={gStyles.payMethodIconBack}>
          <Image
            style={gStyles.payMethodIcon}
            source={require("../../../assets/images/pay-method/arrow-back.png")}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity> */}
        <Text style={gStyles.payMethodSelectTitleTxt}>
          Выберите способ оплаты
        </Text>
      </View>
      {/* <Button
      title="Назад"
      onPress={() => setIsAddPaymentMethod(false)}
    /> */}
      <View style={gStyles.payHistoryBoxItem}>
        <TouchableOpacity
          style={gStyles.pageProfileUserItem}
          //   onPress={() => handleSetPaymentMethod("sber")}
          id="sber"
        >
          <View style={gStyles.pageWalletPayData}>
            <View style={gStyles.payMethodIconBox}>
              <Image
                style={gStyles.payMethodIcon}
                source={require("../../assets/images/pay-method/sberpay.png")}
                resizeMode="contain"
              />
            </View>
            <View style={gStyles.pageProfileUserItemData}>
              {/* <Text style={gStyles.pagePDescr}>MasterCard</Text> */}
              <Text style={gStyles.pagePName}>Привязать счет SberPay</Text>
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

        <TouchableOpacity
          style={gStyles.pageProfileUserItem}
          //   onPress={handleAddPaymentMethod}
        >
          <View style={gStyles.pageWalletPayData}>
            <View style={gStyles.payMethodIconBox}>
              <Image
                style={gStyles.payMethodIcon}
                source={require("../../assets/images/pay-method/add-card.png")}
                resizeMode="contain"
              />
            </View>
            <View style={gStyles.pageProfileUserItemData}>
              <Text style={gStyles.pagePName}>Привязать карту</Text>
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
    </View>
  );
};

export default AddPaymentMethod;
