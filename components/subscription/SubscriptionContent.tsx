import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { ISubscription } from "@/interfaces/subscription/subscription.interface";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
import { useUserStore } from "@/stores/user-store";
import paymentService from "@/services/payment.service";
import userService from "@/services/user.service";
import { IUser } from "@/interfaces/user/user.interface";
import Toast from "react-native-toast-message";
import request from "axios";
import { useState } from "react";
import { useControllUiStore } from "@/stores/controll-ui-store";

type Props = {
  selectedSubscription: ISubscription | null | undefined;
  close: () => void;
};

export default function SubscriptionContent({
  selectedSubscription,
  close,
}: Props) {
  const { user, setUser } = useUserStore();

  const setIsLoading = useControllUiStore((state) => state.setIsLoading);

  const activePaymentMethod = user?.paymentMethods.find(
    (x) => x.id === user.activePaymentMethod
  );

  const [disabled, setDisabled] = useState<boolean>(false);

  const setPaymentMethodIcon = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "Visa":
        return require("../../assets/images/pay-method/visa.png");
      default:
        return require("../../assets/images/pay-method/mastercard.png");
    }
  };

  const handleCreatePayment = async () => {
    if (!user) {
      return;
    }

    if (!selectedSubscription) {
      return;
    }

    if (!activePaymentMethod) {
      return;
    }

    if (user.subscriptionsOptions) {
      Alert.alert("У вас уже подключена подписка");
      return;
    }

    setIsLoading(true);

    const data = {
      value: selectedSubscription.price,
      type: "bank_card",
      description: `На ${selectedSubscription.days} дней`,
      metadata: {
        type: "SUBSCRIPTION",
        description: `Подписка ${selectedSubscription.id}`,
      },
      paymentMethodId: activePaymentMethod.id,
      paymentMethodStringId: activePaymentMethod.paymentId,
      userId: user?.id,
    };

    setDisabled(true);

    try {
      const res = await paymentService.createPayment(data);
      if (res) {
        const user = await userService.getMe();
        setUser(user);
        close();
        Toast.show({
          text1: "Подписка успешно оформлена",
          type: "success",
        });
      }
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        Toast.show({
          type: "error",
          text1: err.response.data.message,
        });
      }
    } finally {
      setDisabled(false);
      setIsLoading(false);
    }
  };

  return (
    <View style={gStyles.pageProfileSection}>
      <View style={gStyles.passPopupTitleBox}>
        <Text style={gStyles.passPopupTitle}>Подписка - </Text>
        <View style={gStyles.yellowBorder}>
          <Text style={gStyles.passPopupTitleValue}>
            На {selectedSubscription?.days} дней
          </Text>
        </View>
      </View>

      <View style={gStyles.payHistoryBoxItem}>
        <View style={gStyles.pageProfileUserItem}>
          <View style={gStyles.pageWalletPayData}>
            <View style={gStyles.passPopupAdvItem}>
              <Image
                style={gStyles.payMethodIcon}
                source={require("../../assets/images/menu/start-0.png")}
                resizeMode="contain"
              />
            </View>
            <View style={gStyles.passCardItemData}>
              <Text style={gStyles.pagePName}>0 Р за старт</Text>
              {/* <Text style={gStyles.pagePDescr}>На все поездки</Text> */}
              <Text style={gStyles.pagePDescr}>
                На одиночные и групповые поездки
              </Text>
            </View>
          </View>
        </View>

        <View style={gStyles.pageProfileUserItem}>
          <View style={gStyles.pageWalletPayData}>
            <View
              style={[gStyles.passPopupAdvItem, gStyles.passPopupAdvItemBgRed]}
            >
              <Image
                style={gStyles.passPopupAdvIcon}
                source={require("../../assets/images/pass/adv/scooter.png")}
                resizeMode="contain"
              />
            </View>
            <View style={gStyles.passCardItemData}>
              <Text style={gStyles.pagePName}>Без ограничений</Text>
              <Text style={gStyles.passCardPDescr}>
                Бери самокат сколько хочешь, оплата только за минуты
              </Text>
            </View>
          </View>
        </View>

        <View style={gStyles.pageProfileUserItem}>
          <View style={gStyles.pageWalletPayData}>
            <View
              style={[
                gStyles.passPopupAdvItem,
                gStyles.passPopupAdvItemBgOrange,
              ]}
            >
              <Image
                style={gStyles.passPopupAdvIcon}
                source={require("../../assets/images/pass/adv/like.png")}
                resizeMode="contain"
              />
            </View>
            <View style={gStyles.passCardItemData}>
              <Text style={gStyles.pagePName}>Выгодно</Text>
              <Text style={gStyles.pagePDescr}>
                Окупается за несколько поездок
              </Text>
            </View>
          </View>
        </View>

        <View style={gStyles.pageProfileUserItem}>
          <View style={gStyles.pageWalletPayData}>
            <View
              style={[
                gStyles.passPopupAdvItem,
                gStyles.passPopupAdvItemBgGreen,
              ]}
            >
              <Image
                style={gStyles.passPopupAdvIcon}
                source={require("../../assets/images/pass/adv/pause.png")}
                resizeMode="contain"
              />
            </View>
            <View style={gStyles.passCardItemData}>
              <Text style={gStyles.pagePName}>Поставим на паузу</Text>
              <Text style={gStyles.pagePDescr}>
                Когда закончится сезон в вашем городе
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={gStyles.pageItemLine}></View>
      <TouchableOpacity
        style={gStyles.pageProfileUserItem}
        //   onPress={openBottomSheet}
      >
        {user?.activePaymentMethod && activePaymentMethod ? (
          <View style={gStyles.pageWalletPayData}>
            <View style={gStyles.payMethodIconBox}>
              <Image
                style={gStyles.payMethodIcon}
                source={setPaymentMethodIcon(activePaymentMethod.cardType)}
                resizeMode="contain"
              />
            </View>
            <View style={gStyles.pageProfileUserItemData}>
              <Text style={gStyles.pagePDescr}>
                {activePaymentMethod?.cardType}
              </Text>
              <Text style={gStyles.pagePName}>
                * {activePaymentMethod?.cardLastFour}
              </Text>
            </View>
          </View>
        ) : (
          <View style={gStyles.pageWalletPayData}>
            <View style={gStyles.pageProfileUserItemData}>
              <Text style={gStyles.pagePName}>Добавить метод оплаты</Text>
            </View>
          </View>
        )}
        <View>
          <Image
            style={gStyles.pageProfileIconArrow}
            source={require("../../assets/images/arrow-upward.png")}
          />
        </View>
      </TouchableOpacity>

      {/* <View style={gStyles.pageRefillIAddBtnBox}> */}
      <TouchableOpacity
        style={mzStyles.BtnOk}
        onPress={handleCreatePayment}
        disabled={disabled}
      >
        <Text style={mzStyles.BtnOkTxt}>Оформить за</Text>
        <View style={gStyles.passCardPriceBoxInBtn}>
          <Text style={gStyles.passCardPrice}>
            {selectedSubscription?.price}
          </Text>
          <Image
            style={gStyles.passCardIconRub}
            resizeMode="contain"
            source={require("../../assets/images/rub-b.png")}
          />
        </View>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
}
function setUser(user: IUser) {
  throw new Error("Function not implemented.");
}
