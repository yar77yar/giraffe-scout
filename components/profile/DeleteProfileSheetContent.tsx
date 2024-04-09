import mzStyles from "@/styles/mod-zone-style";
import gStyles from "@/styles/style";
import React, { FC, Fragment } from "react";
import { TouchableOpacity, View, Text } from "react-native";

type Props = {
  close: () => void;
  handleDeleteProfile: () => void;
};

const DeleteProfileSheetContent: FC<Props> = ({
  close,
  handleDeleteProfile,
}) => {
  return (
    <Fragment>
      <View style={gStyles.rideEndContainer}>
        <Text style={gStyles.rideEndTitle}>
          Уверен, что хочешь удалить аккаунт?
        </Text>
        <View style={gStyles.rideEndRecBox}>
          <View style={gStyles.rideEndRecCard}>
            <View style={gStyles.rideEndRecTxt}>
              <Text style={gStyles.rideEndDepositDesc}>
                Аккаунт и все связанные с ним данные, в том числе подписки и
                счёт кошелька будут удалены, и не подлежат восстановлению.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={mzStyles.BtnBox}>
        <View style={mzStyles.BtnBoxTwoVert}>
          <TouchableOpacity style={mzStyles.BtnOk} onPress={close}>
            <Text style={mzStyles.BtnOkTxt}>Отмена</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={gStyles.btnPayMethod}
            onPress={() => handleDeleteProfile()}
          >
            <Text style={mzStyles.BtnOkTxt}>Да, удалить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

export default DeleteProfileSheetContent;
