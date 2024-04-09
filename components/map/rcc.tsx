import React from "react";

export const rcc = () => {
  return (
    <Pressable style={gStyles.parkingMapContainer}>
      <View style={gStyles.parkingMapBox}>
        <View style={gStyles.parkingMapWrapper}>
          <Image style={gStyles.parkingMapIcon} source={setGeofenceIcon()} />
          {geofence.type.slug === geofenceTypeSlug.parkingCircle ? (
            <Text style={gStyles.parkingMapCountScoot}>24</Text>
          ) : null}
        </View>
      </View>

      {geofence.type.slug === geofenceTypeSlug.parkingCircle ? (
        <View style={gStyles.parkingMapArrowDown}></View>
      ) : null}
    </Pressable>
  );
};
