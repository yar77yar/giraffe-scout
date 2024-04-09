import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Button,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import gStyles from "@/styles/style";
import mzStyles from "@/styles/mod-zone-style";
// import { Shadow, ShadowProps } from "react-native-shadow-2";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import tripService from "@/services/trip.service";
import dateConverter from "@/utils/date-converter";
import { ITrip } from "@/interfaces/trip/trip.interface";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { GOOGLE_KEY } from "@/api/constants";
import distanceConverter from "@/utils/distance-converter";

type Coordinates =
  | {
      latitude: number;
      longitude: number;
    }[]
  | null;

export default function SingleTrip() {
  const { id } = useLocalSearchParams();

  const [trip, setTrip] = useState<ITrip>();

  const currentId = typeof id === "string" ? id : null;

  // Табуляция
  const [activeTab, setActiveTab] = useState(0);
  const handleTabPress = (index: number) => {
    setActiveTab(index);
    // Дополнительная логика, связанная с изменением таба
  };

  const mapRef: LegacyRef<MapView> = useRef(null);

  const tripQuery = useQuery({
    queryKey: ["trip"],
    queryFn: () => tripService.getOne(currentId),
  });

  if (tripQuery.isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        color={"#FFFF00"}
        style={{
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    );
  }

  const coordinates: Coordinates =
    (tripQuery.data && JSON.parse(tripQuery.data.coordinates || null)) || null;

  function findCenter() {
    if (!coordinates) {
      return;
    }
    const firstCoord = coordinates[0];
    const lastCoord = coordinates[coordinates.length - 1];

    const centerLatitude = (firstCoord.latitude + lastCoord.latitude) / 2;
    const centerLongitude = (firstCoord.longitude + lastCoord.longitude) / 2;

    return { latitude: centerLatitude, longitude: centerLongitude };
  }

  const center = findCenter();

  return (
    <>
      {/* <View>
      <Text>{id}</Text>
    </View> */}
      {/* <View style={gStyles.pageHtripsContainer}> */}
      <View style={[gStyles.pageProfileSection, gStyles.bottomRadius]}>
        {/* Карточка поездки */}
        <View style={gStyles.cardHtripyItem}>
          <View style={gStyles.payHistoryMethodIconBox}>
            <Image
              style={gStyles.payHistoryIcon}
              source={require("../../../assets/images/pay-method/scooter-pay.png")}
              resizeMode="contain"
            />
          </View>

          <View style={gStyles.boxCardHtripsStroke}>
            <View style={gStyles.cardHtripsStroke}>
              <Text style={gStyles.cardHtripsDateTxt}>
                {dateConverter.getTripDate(tripQuery.data?.endTime)}
              </Text>
              <View style={gStyles.cardHtripsPrice}>
                <Text style={gStyles.cardHtripsPriceTxt}>
                  {tripQuery.data?.price} &#8381;
                </Text>
                {/* <Image
                  style={gStyles.payHistoryIconRub}
                  source={require("../../../assets/images/rub-b.png")}
                  resizeMode="contain"
                /> */}
              </View>
            </View>

            <View style={gStyles.cardHtripsStroke}>
              <View style={gStyles.boxCardHtripsQr}>
                <Image
                  style={gStyles.cardHtripsIconTime}
                  source={require("../../../assets/images/history-trip/qr.png")}
                  resizeMode="contain"
                />
                <Text style={gStyles.pageHtripsQrTxt}>
                  {tripQuery.data?.scooter.deviceId}
                </Text>
              </View>

              <View style={gStyles.boxCardHtripsValue}>
                <View style={gStyles.boxCardHtripsStat}>
                  <Image
                    style={gStyles.cardHtripsIconTime}
                    source={require("../../../assets/images/history-trip/geo.png")}
                    resizeMode="contain"
                  />
                  <Text style={gStyles.pageHtripsDescr}>
                    {distanceConverter.getTripDistance(
                      tripQuery.data?.distance
                    )}
                  </Text>
                </View>

                <View style={gStyles.boxCardHtripsStat}>
                  <Image
                    style={gStyles.cardHtripsIconTime}
                    source={require("../../../assets/images/history-trip/time.png")}
                    resizeMode="contain"
                  />
                  <Text style={gStyles.pageHtripsDescr}>
                    {dateConverter.calculateTripTimeDuration(
                      tripQuery.data?.startTime,
                      tripQuery.data?.endTime
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* end Карточка поездки */}

        {/* Табуляция - Вкладки */}
        <View style={gStyles.passCardTabsBox}>
          <TouchableOpacity
            style={[
              gStyles.passCardTabs,
              activeTab === 0 && gStyles.passCardTabsActive,
            ]}
            onPress={() => handleTabPress(0)}
          >
            <Text
              style={[
                gStyles.passCardTabsTxt,
                activeTab === 0 && gStyles.passCardTabsTxtActive,
              ]}
            >
              Инфо
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              gStyles.passCardTabs,
              activeTab === 1 && gStyles.passCardTabsActive,
            ]}
            onPress={() => handleTabPress(1)}
          >
            <Text
              style={[
                gStyles.passCardTabsTxt,
                activeTab === 1 && gStyles.passCardTabsTxtActive,
              ]}
            >
              Стоимость
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              gStyles.passCardTabs,
              activeTab === 2 && gStyles.passCardTabsActive,
            ]}
            onPress={() => handleTabPress(2)}
          >
            <Text
              style={[
                gStyles.passCardTabsTxt,
                activeTab === 2 && gStyles.passCardTabsTxtActive,
              ]}
            >
              Маршрут
            </Text>
          </TouchableOpacity>
        </View>
        {/* end Табуляция - Вкладки */}
      </View>

      {/* Контент - Вкладок табуляции */}
      {/* <ScrollView 
      style={gStyles.tabHtripSection}
      > */}
      {/* <View style={gStyles.tabHtripSection}> */}
      {/* Контент таба Инфо */}
      {activeTab === 0 && (
        <ScrollView style={gStyles.tabHtripSection}>
          <View style={gStyles.tabHtripInfoWrapper}>
            <View style={gStyles.tabHtripInfoBox}>
              <Text style={gStyles.tabHtripInnerTitle}>Поездка</Text>

              <View style={gStyles.tabHtripInnerBox}>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Старт</Text>
                  <Text style={gStyles.tabHtripInnerTxt}>
                    {dateConverter.convertTripIntervals(
                      tripQuery.data?.startTime
                    )}
                  </Text>
                </View>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Финиш</Text>
                  <Text style={gStyles.tabHtripInnerTxt}>
                    {dateConverter.convertTripIntervals(
                      tripQuery.data?.endTime
                    )}
                  </Text>
                </View>
              </View>

              <View style={gStyles.tabHtripInnerBox}>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>В пути</Text>
                  <Text style={gStyles.tabHtripInnerTxt}>
                    {dateConverter.calculateTripTimeDuration(
                      tripQuery.data?.startTime,
                      tripQuery.data?.endTime
                    )}
                  </Text>
                </View>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Расстояние</Text>
                  <Text style={gStyles.tabHtripInnerTxt}>
                    {distanceConverter.getTripDistanceSecondCase(
                      tripQuery.data?.distance
                    )}
                  </Text>
                </View>
              </View>
            </View>

            <View style={gStyles.pageItemLine}></View>

            <TouchableOpacity style={gStyles.htripiInsuranceBox}>
              <Text style={gStyles.tabHtripInnerTitle}>Страховой полис</Text>
              <Image
                style={gStyles.pageProfileIconArrow}
                source={require("../../../assets/images/arrow-upward.png")}
              />
            </TouchableOpacity>

            <View style={gStyles.pageItemLine}></View>

            <View style={gStyles.tabHtripInfoBox}>
              <Text style={gStyles.tabHtripInnerTitle}>
                Фото при завершении
              </Text>

              <View style={gStyles.tabHtripInfoImgBox}>
                <Image
                  style={gStyles.tabHtripInfoImg}
                  source={{
                    uri: `https://erp.e-mqtt.ru/uploads/images/trips/${tripQuery?.data?.tripId}/photo/image.png`,
                  }}
                  resizeMode="stretch"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Контент таба Стоимость */}
      {activeTab === 1 && (
        <ScrollView style={gStyles.tabHtripSection}>
          <View style={gStyles.tabHtripInfoWrapper}>
            <View style={gStyles.tabHtripInfoBox}>
              <Text style={gStyles.tabHtripInnerTitle}>Тариф</Text>

              <View
                style={{
                  ...gStyles.htripTarifBox,
                  backgroundColor: tripQuery.data?.tariff.colorHex,
                }}
              >
                <Text style={gStyles.htripTarifBoxTitle}>
                  {tripQuery.data?.tariff.name}
                </Text>
                <View>
                  <Text style={gStyles.htripTarifValue}>
                    {tripQuery.data?.tariff.boardingCost} &#8381; старт,{" "}
                    {tripQuery.data?.tariff.minuteCost} &#8381;/мин
                  </Text>
                  {/* <View style={gStyles.cardHtripsPrice}>
                      <Text style={gStyles.tabHtripInnerTxt}>30 &#8381;</Text>
                   
                    </View>
                    <Text style={gStyles.tabHtripInnerTxt}> старт, </Text>
                    <View style={gStyles.cardHtripsPrice}>
                      <Text style={gStyles.tabHtripInnerTxt}>5,60 &#8381;</Text>
                      <Image
                        style={gStyles.payHistoryIconRub}
                        source={require("../../../assets/images/rub-b.png")}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={gStyles.tabHtripInnerTxt}>/мин</Text> */}
                </View>
              </View>
            </View>
            <View style={gStyles.pageItemLine}></View>
            <View style={gStyles.tabHtripInfoBox}>
              <Text style={gStyles.tabHtripInnerTitle}>Детали</Text>

              <View style={gStyles.tabHtripInnerBox}>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Старт</Text>
                  <View>
                    <Text style={gStyles.tabHtripInnerTxt}>
                      {tripQuery.data?.tariff.boardingCost} &#8381;
                    </Text>
                  </View>
                </View>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>
                    Поездка(
                    {dateConverter.calculateTripTimeDurationInCard(
                      tripQuery.data?.startTime,
                      tripQuery.data?.endTime
                    )}
                    )
                  </Text>
                  <View>
                    <Text style={gStyles.tabHtripInnerTxt}>
                      {tripQuery.data?.price} &#8381;
                    </Text>
                  </View>
                </View>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTitleTotal}>Итого</Text>
                  <View style={gStyles.cardHtripsPrice}>
                    <Text style={gStyles.tabHtripInnerTitleTotal}>
                      {tripQuery.data &&
                        tripQuery.data?.tariff.boardingCost +
                          tripQuery.data?.price}{" "}
                      &#8381;
                    </Text>
                    {/* <Image
                      style={gStyles.tabHtripIconTotal}
                      source={require("../../../assets/images/rub-b.png")}
                      resizeMode="contain"
                    /> */}
                  </View>
                </View>
              </View>
            </View>

            <View style={gStyles.pageItemLine}></View>

            <View style={gStyles.tabHtripInfoBox}>
              <Text style={gStyles.tabHtripInnerTitle}>Способ оплаты</Text>

              <View style={gStyles.tabHtripInnerBox}>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>
                    Оплачено с кошелька
                  </Text>
                  <View>
                    <Text style={gStyles.tabHtripInnerTxt}>0 &#8381;</Text>
                  </View>
                </View>
                <View style={gStyles.tabHtripInnerBoxStroke}>
                  <Text style={gStyles.tabHtripInnerTxt}>Оплачено картой</Text>
                  <View>
                    <Text style={gStyles.tabHtripInnerTxt}>
                      {" "}
                      {tripQuery.data &&
                        tripQuery.data?.tariff.boardingCost +
                          tripQuery.data?.price}{" "}
                      &#8381;
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={gStyles.pageItemLine}></View>

            <TouchableOpacity style={gStyles.htripiInsuranceBox}>
              <Text style={gStyles.tabHtripInnerTitle}>Фискальный чек</Text>
              <Image
                style={gStyles.pageProfileIconArrow}
                source={require("../../../assets/images/arrow-upward.png")}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Контент таба Маршрут */}
      {activeTab === 2 && (
        <View style={gStyles.tabHtripMap}>
          {/* <Text>Маршрут</Text> */}

          {coordinates && center ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
              googleMapId={GOOGLE_KEY}
              loadingBackgroundColor="#00000070"
            >
              <Marker coordinate={coordinates[0]} />
              <Marker coordinate={coordinates[coordinates.length - 1]} />
              <Polyline coordinates={coordinates} strokeColor="blue" />
            </MapView>
          ) : null}
        </View>
      )}
      {/* </View> */}
      {/* </ScrollView> */}

      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0,5)",
  },
});
