export function isCorrectScooterQr(payload: string) {
  const cleanedPayload = payload.replace(/\s/g, "");

  const regex = /^\d{3}-\d{3}$/;
  return regex.test(cleanedPayload);
}
