import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  covertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.covertToUTC(end_date);
    const start_date_utc = this.covertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "hour");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.covertToUTC(end_date);
    const start_date_utc = this.covertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
