export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}
