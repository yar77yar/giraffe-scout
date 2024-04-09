type MainLocation = {
  lat: number;
  lon: number;
};

type GeoZone = MainLocation[];

function isInGeoZone(userLocation: MainLocation, geoZones: GeoZone[]): boolean {
  const { lat: userLat, lon: userLon } = userLocation;
  for (let i = 0; i < geoZones.length; i++) {
    let zone = geoZones[i];
    if (isInsidePolygon(userLat, userLon, zone)) {
      return true;
    }
  }
  return false;
}

function isInsidePolygon(
  userLat: number,
  userLon: number,
  zone: MainLocation[]
): boolean {
  let inside = false;
  for (let i = 0, j = zone.length - 1; i < zone.length; j = i++) {
    const lati = zone[i].lat;
    const loni = zone[i].lon;
    const latj = zone[j].lat;
    const lonj = zone[j].lon;
    if (
      loni > userLon !== lonj > userLon &&
      userLat < ((latj - lati) * (userLon - loni)) / (lonj - loni) + lati
    ) {
      inside = !inside;
    }
  }
  return inside;
}
