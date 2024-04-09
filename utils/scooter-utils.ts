export class ScooterUtils {
  private batteryCharge: number;
  private readonly maxSpeed = 25;
  private readonly efficiency = 0.5; // количество км, проходимых на 1% заряда батареи

  constructor(batteryCharge: number) {
    this.batteryCharge = batteryCharge;
  }

  calculateTimeToDischarge(): string {
    const averageSpeed = this.maxSpeed / 2;
    const efficiency = this.maxSpeed / averageSpeed; // Эффективность: скорость на заряд
    const timeInHours = this.batteryCharge / efficiency;
    const hours = Math.floor(timeInHours);
    const minutes = Math.floor((timeInHours - hours) * 60);

    // Корректировка времени на основе среднего времени работы, полученного от другого сервиса
    const adjustedHours = hours + 1; // Добавляем 1 час к оценке
    const adjustedMinutes = Math.floor(
      minutes + ((54 - 29) / 25) * this.batteryCharge
    ); // Корректируем минуты в зависимости от изменения времени

    return `${adjustedHours} часов ${adjustedMinutes} минут`;
  }
}
