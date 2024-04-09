import { Fragment } from "react";
import { View, Image, Text } from "react-native";
import gStyles from "@/styles/style";
import { Payment } from "@/interfaces/user/user.interface";
import dateConverter from "@/utils/date-converter";

type Props = {
  item: {
    date: string;
    payments: Payment[];
  };
};

export default function PaymentItem({ item }: Props) {
  const sortByDate = (a: Payment, b: Payment) => {
    const dateA = new Date(b.datetimeCreated).getTime();
    const dateB = new Date(a.datetimeCreated).getTime();

    return dateA - dateB;
  };

  const setPaymentMethodIcon = (payment: Payment) => {
    switch (payment.paymentMethod.cardType) {
      case "Visa":
        return require("../../assets/images/pay-method/visa.png");
      case "Visa Electron":
        return require("../../assets/images/pay-method/visa.png");
      case "Mir":
        return require("../../assets/images/pay-method/mir.png");
      default:
        return require("../../assets/images/pay-method/mastercard.png");
    }
  };

  return (
    <Fragment>
      <View style={gStyles.payHistoryOneDateContainer}>
        <Text style={gStyles.payHistoryDate}>
          {dateConverter.getLocaleDate(item.date)}
        </Text>
        <View style={gStyles.payHistoryBoxItem}>
          {item.payments.sort(sortByDate).map((payment, index) => (
            <Fragment key={payment.id}>
              <View style={gStyles.payHistoryItem}>
                <View style={gStyles.payHistoryItemData}>
                  <View style={gStyles.payHistoryMethodIconBox}>
                    {payment.service !== "SUBSCRIPTION" ? (
                      <Image
                        style={gStyles.payHistoryIcon}
                        source={setPaymentMethodIcon(payment)}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        style={gStyles.payHistoryIcon}
                        source={require("../../assets/images/pay-method/pass.png")}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={gStyles.payHistoryValueTxt}>
                    <Text style={gStyles.payHistoryTypeTxt}>
                      {payment.service === "SUBSCRIPTION"
                        ? "Оплата подписки"
                        : "Пополнение кошелька"}
                    </Text>

                    {payment.service !== "SUBSCRIPTION" ? (
                      <Text style={gStyles.pagePDescr}>
                        {payment.paymentMethod.cardType} *
                        {payment.paymentMethod.cardLastFour}
                      </Text>
                    ) : (
                      <Text style={gStyles.pagePDescr}>
                        {payment.description}
                      </Text>
                    )}
                  </View>
                </View>

                {payment.service !== "SUBSCRIPTION" ? (
                  <View style={gStyles.payHistoryPriceBox}>
                    <View style={gStyles.payHistoryPriceWallet}>
                      <Text style={gStyles.payHistoryPriceRefillTxt}>
                        +{payment.amount}
                      </Text>
                      <Image
                        style={gStyles.payHistoryIconMiniWallet}
                        source={require("../../assets/images/pay-method/mini-wallet.png")}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                ) : (
                  <View style={gStyles.payHistoryPriceBox}>
                    <View style={gStyles.payHistoryPriceDebt}>
                      <Text style={gStyles.payHistoryPriceDebtTxt}>
                        -{payment.amount}
                      </Text>
                      <Image
                        style={gStyles.payHistoryIconRub}
                        source={require("../../assets/images/rub-b.png")}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
              </View>
              {payment.id !== item.payments[item.payments.length - 1].id ? (
                <View style={gStyles.pageItemLine}></View>
              ) : null}
            </Fragment>
          ))}
        </View>
      </View>
    </Fragment>
  );
}
