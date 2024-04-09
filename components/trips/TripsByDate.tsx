import gStyles from "@/styles/style";
import { Fragment } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import dateConverter from "@/utils/date-converter";
import { ITrip } from "@/interfaces/trip/trip.interface";
import distanceConverter from "@/utils/distance-converter";

type Props = {
  item: {
    date: string;
    trips: ITrip[];
  };
};
export default function TripsByDate({ item }: Props) {
  const sortByDate = (a: ITrip, b: ITrip) => {
    const dateA = new Date(b.endTime).getTime();
    const dateB = new Date(a.endTime).getTime();

    return dateA - dateB;
  };

  return (
    <Fragment>
      {/* Контейнер сортировки по месяцу */}
      <View style={gStyles.payHistoryOneDateContainer}>
        <Text style={gStyles.payHistoryDate}>
          {dateConverter.getLocaleDate(item.date)}
        </Text>
        {/* Контейнер карточек */}
        <View style={gStyles.payHistoryBoxItem}>
          {/* Карточка поездки */}
          {item.trips.sort(sortByDate).map((trip) => (
            <Fragment key={trip.id}>
              <TouchableOpacity
                style={gStyles.cardHtripyItem}
                onPress={() =>
                  router.navigate({
                    pathname: "/(app)/trip/[id]",
                    params: { id: trip.id },
                  })
                }
              >
                <View style={gStyles.payHistoryMethodIconBox}>
                  <Image
                    style={gStyles.payHistoryIcon}
                    source={require("../../assets/images/pay-method/scooter-pay.png")}
                    resizeMode="contain"
                  />
                </View>

                <View style={gStyles.boxCardHtripsStroke}>
                  <View style={gStyles.cardHtripsStroke}>
                    <Text style={gStyles.cardHtripsDateTxt}>
                      {dateConverter.getTripDate(trip.endTime)}
                    </Text>
                    <View style={gStyles.cardHtripsPrice}>
                      <Text style={gStyles.cardHtripsPriceTxt}>
                        {trip.price} &#8381;
                      </Text>
                    </View>
                  </View>

                  <View style={gStyles.cardHtripsStroke}>
                    <View style={gStyles.boxCardHtripsQr}>
                      <Image
                        style={gStyles.cardHtripsIconTime}
                        source={require("../../assets/images/history-trip/qr.png")}
                        resizeMode="contain"
                      />
                      <Text style={gStyles.pageHtripsQrTxt}>
                        {trip.scooter.deviceId}
                      </Text>
                    </View>

                    <View style={gStyles.boxCardHtripsValue}>
                      <View style={gStyles.boxCardHtripsStat}>
                        <Image
                          style={gStyles.cardHtripsIconTime}
                          source={require("../../assets/images/history-trip/geo.png")}
                          resizeMode="contain"
                        />
                        <Text style={gStyles.pageHtripsDescr}>
                          {distanceConverter.getTripDistance(trip.distance)}
                        </Text>
                      </View>

                      <View style={gStyles.boxCardHtripsStat}>
                        <Image
                          style={gStyles.cardHtripsIconTime}
                          source={require("../../assets/images/history-trip/time.png")}
                          resizeMode="contain"
                        />
                        <Text style={gStyles.pageHtripsDescr}>
                          {dateConverter.calculateTripTimeDuration(
                            trip.startTime,
                            trip.endTime
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {trip.id === item.trips[item.trips.length - 1].id ? null : (
                <View style={gStyles.pageItemLine}></View>
              )}
            </Fragment>
          ))}
        </View>
      </View>
      {/* end Контейнер сортировки по месяцу */}

      {/* end Контейнер сортировки по месяцу */}
    </Fragment>
  );
}
