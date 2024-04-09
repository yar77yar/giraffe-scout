import { ITariff } from "@/interfaces/tariff/tariff.interface";
import tariffService from "@/services/tariff.service";
import { useScooterStore } from "@/stores/scooter-store";
import { ScooterUtils } from "@/utils/scooter-utils";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import gStyles from "@/styles/style";
import { router } from "expo-router";
import TariffModal from "../tariff/TariffModal";
import { useTripProcessStore } from "@/stores/trip-process.store";

export default function ScooterInSheet() {
  const { selectedScooter } = useScooterStore();
  const { setSelectedTariff } = useTripProcessStore();

  const tariffQuery = useQuery({
    queryKey: ["tariffs"],
    queryFn: tariffService.getAll,
  });

  const scooterDeviceInfo = new ScooterUtils(
    selectedScooter?.rightechScooter?.state.charge || 100
  );

  return (
    <>
      <View style={styles.sheetContent}>
        <View style={gStyles.sheetScooterBox}>
          <View style={gStyles.sheetScooterImgBox}>
            <View style={gStyles.sheetScooterImgEl}>
              <Image
                style={gStyles.sheetScooterImg}
                source={require("../../assets/images/scooters/scooter-cover-big.png")}
              />
              {/* <Image
                style={gStyles.sheetScooterImgBack}
                source={require("../../assets/images/scooters/circle-scoot-back.png")}
              /> */}
            </View>
          </View>

          <View style={gStyles.sheetScooterInfoWrapper}>
            <View style={gStyles.sheetScooterInfoOne}>
              <View style={gStyles.ssioDistance}>
                <Image
                  style={gStyles.ssioDistanceImg}
                  resizeMode="contain"
                  source={require("../../assets/images/scooters/distance.png")}
                />
                <View style={gStyles.ssioDistanceValue}>
                  {/* <Text style={gStyles.ssioDistanceValueTxt}>≈2 часа</Text> */}
                  {/* <Text style={gStyles.ssioDistanceValueTxt}>≈40 мин</Text> */}
                  <Text style={gStyles.ssioDistanceValueTxt}>≈4ч 38мин</Text>
                  <View style={gStyles.ssioDistanceDot}></View>
                  <Text style={gStyles.ssioDistanceValueTxt}>10,2км</Text>
                  {/* <Text style={gStyles.ssioDistanceValueTxt}>700 м</Text> */}
                </View>
              </View>

              <View style={gStyles.sssioCharge}>
                <View style={gStyles.sLIChargeBox}>
                  <View style={gStyles.sLILevelBox}></View>
                  {/* <View style={gStyles.innerShadowContent}> 
                            </View> */}
                  <View style={gStyles.sLILevelIcTxtBox}>
                    <Image
                      style={gStyles.sLILightIcon}
                      source={require("../../assets/images/scooters/light.png")}
                    />
                    <Text>
                      {Math.floor(
                        selectedScooter?.rightechScooter?.state.charge || 100
                      )}
                      %
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={gStyles.pageItemLine}></View>

            {/* Блок модель и QR скутера */}
            <View style={gStyles.sheetScooterInfoTwo}>
              <View style={gStyles.sLIInfoWrap}>
                <Text style={gStyles.sLIModelTxt}>
                  {selectedScooter?.scooter.model.modelName}
                </Text>
                <View style={gStyles.sLIqr}>
                  <Image
                    style={gStyles.sLIqrIcon}
                    source={require("../../assets/images/scooters/qr-mini-card.png")}
                  />
                  <Text style={gStyles.sLIqrTxt}>
                    {selectedScooter?.scooter.deviceId}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <Text>
          Заряда хватит примерно на{" "}
          {scooterDeviceInfo.calculateTimeToDischarge()}
        </Text>
        <View>
          <Text>{selectedScooter?.scooter.model.modelName}</Text>
          <Text>QR: {selectedScooter?.scooter.deviceId}</Text>
          <Text>
            Charge:{" "}
            {Math.floor(selectedScooter?.rightechScooter?.state.charge || 100)}%
          </Text>
        </View> */}
      </View>

      {/* Блок с карточками тарифов */}

      <View style={styles.tariffsScrollContainer}>
        <ScrollView
          horizontal
          // showsHorizontalScrollIndicator={true}
          // style={styles.tariffsContainerScrollLine}
        >
          <View style={styles.tariffsContainer}>
            {tariffQuery.data &&
              tariffQuery.data.map((tariff) => (
                <TouchableOpacity
                  key={tariff.id}
                  onPress={() => {
                    setSelectedTariff(tariff);
                  }}
                  style={{
                    ...gStyles.tariffCard,
                    backgroundColor: tariff.colorHex,
                  }}
                >
                  <Text style={gStyles.tariffsCardName}>{tariff.name}</Text>
                  <Text style={gStyles.tariffsCardPrice}>
                    {tariff.boardingCost}&#8381; + {tariff.minuteCost}
                    &#8381;/мин
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>

      {/* end Блок с карточками тарифов

        {/* {selectedTariff && <Button title={`Беру "${selectedTariff.name}"`} />} */}
    </>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  tariffsScrollContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderTopColor: "#D7F1FA",
    borderWidth: 2,
    // backgroundColor: 'blue',
  },
  tariffsContainer: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
