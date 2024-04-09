import { View, Text, Image, ScrollView, FlatList } from "react-native";
import gStyles from "@/styles/style";
import { useQuery } from "@tanstack/react-query";
import tripService from "@/services/trip.service";
import TripsByDate from "@/components/trips/TripsByDate";

export default function TripHistoryPage() {
  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: tripService.getAll,
    refetchInterval: 1000,
  });

  const groupedTrips =
    tripsQuery.data &&
    tripsQuery.data.reduce((acc: any, trip) => {
      const tripDate = new Date(trip.startTime).toLocaleDateString();
      if (!acc[tripDate]) {
        acc[tripDate] = [];
      }
      acc[tripDate].push(trip);
      return acc;
    }, {});

  const tripsData =
    groupedTrips &&
    Object.entries(groupedTrips)
      .map(([date, trips]: any) => ({
        date,
        trips,
      }))
      .sort((a, b) => {
        const dateA = a.date.split(".").reverse().join("");
        const dateB = b.date.split(".").reverse().join("");

        return dateB.localeCompare(dateA);
      });

  return (
    <ScrollView style={gStyles.pageBgWht}>
      <View style={gStyles.pageProfileSection}>
        {!tripsQuery.data || tripsQuery.data.length === 0 ? (
          <View style={gStyles.passCardNopassBox}>
            <Text style={gStyles.passCardNopassTitle}>
              У вас пока нет поездок
            </Text>
            <Image
              style={gStyles.passCardNopassIcon}
              source={require("../../assets/images/pass/no-pass.png")}
            />
          </View>
        ) : (
          <View style={gStyles.payHistoryWrapper}>
            <FlatList
              data={tripsData}
              keyExtractor={(item) => item.date}
              renderItem={TripsByDate}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// const ShadowCard = {
//   param: {
//     distance: 10,
//     startColor: "#ffffff99",
//     offset: [-9, -2],
//   } as ShadowProps,
// };
