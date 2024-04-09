class DistanceConverter {
  getTripDistance(meters: number | null | undefined): string {
    if (!meters) return "";

    if (meters < 1000) {
      return meters.toString() + "м";
    } else {
      const kilometers = Math.floor(meters / 1000);
      const remainingMeters = meters % 1000;
      const formattedMeters =
        remainingMeters > 0
          ? (remainingMeters / 100).toFixed(1).replace(/\.0$/, "")
          : "0";
      return (
        kilometers.toString() +
        (formattedMeters !== "0" ? `,${formattedMeters}` : "") +
        "км"
      );
    }
  }

  getTripDistanceSecondCase(meters: number | null | undefined): string {
    if (!meters) return "";

    if (meters < 1000) {
      return meters.toString() + " м";
    } else {
      const kilometers = Math.floor(meters / 1000);
      const remainingMeters = meters % 1000;
      const formattedMeters =
        remainingMeters > 0
          ? (remainingMeters / 100).toFixed(1).replace(/\.0$/, "")
          : "0";
      return (
        kilometers.toString() +
        (formattedMeters !== "0" ? `,${formattedMeters}` : "") +
        " км"
      );
    }
  }
}

export default new DistanceConverter();
