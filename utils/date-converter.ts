import { parse, format, parseISO } from "date-fns";

const MONTHS: { [key: string]: string } = {
  "01": "янв.",
  "02": "фев.",
  "03": "мар.",
  "04": "апр.",
  "05": "мая",
  "06": "июня",
  "07": "июля",
  "08": "авг.",
  "09": "сен.",
  "10": "окт.",
  "11": "ноя.",
  "12": "дек.",
};

class DateConverter {
  getLocaleDate(dateString: string) {
    const parsedDate = parse(dateString, "d.M.yyyy", new Date());

    if (isNaN(parsedDate.getTime())) {
      // Обработка ошибки парсинга
      return "Некорректная дата";
    }

    const formattedDate = format(parsedDate, "d LLLL yyyy", {
      // @ts-ignore
      locale: ruLocale,
    });

    return formattedDate;
  }

  getFormattedDate(date: string | null | undefined) {
    if (!date) return "";
    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, "dd.MM.yyyy");
    return formattedDate;
  }

  getTripDate(dateIso: string | null | undefined) {
    if (!dateIso) return "";

    const date = new Date(dateIso);
    const day = date.getDate().toString().padStart(2, "0");
    const month = MONTHS[(date.getMonth() + 1).toString().padStart(2, "0")];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month}, ${hours}:${minutes}`;
  }

  calculateTripTimeDuration(
    start: string | null | undefined,
    end: string | null | undefined
  ): string {
    if (!start || !end) return "";

    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    if (isNaN(startTime) || isNaN(endTime)) {
      return "Invalid time format";
    }

    let duration = endTime - startTime;

    const hours = Math.floor(duration / (1000 * 60 * 60));
    duration %= 1000 * 60 * 60;
    const minutes = Math.floor(duration / (1000 * 60));

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
  }

  calculateTripTimeDurationInCard(
    start: string | null | undefined,
    end: string | null | undefined
  ): string {
    if (!start || !end) return "";

    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    if (isNaN(startTime) || isNaN(endTime)) {
      return "Invalid time format";
    }

    let duration = endTime - startTime;

    const hours = Math.floor(duration / (1000 * 60 * 60));
    duration %= 1000 * 60 * 60;
    const minutes = Math.floor(duration / (1000 * 60));

    if (hours === 0) {
      return `${minutes} мин.`;
    } else {
      return `${hours} ч. ${minutes} мин.`;
    }
  }

  convertTripIntervals(dateIso: string | null | undefined) {
    if (!dateIso) return "";

    const date = new Date(dateIso);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }
}

const ruLocale = {
  formatDistance: () => "",
  formatRelative: () => "",
  localize: {
    month: (n: any) => {
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      return months[n];
    },
    day: (n: any) => String(n),
  },
  match: {
    ordinalNumber: () => "",
    week: () => "",
  },
  options: { weekStartsOn: 0 },
};

export default new DateConverter();
