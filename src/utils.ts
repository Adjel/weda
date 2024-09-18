import { Day } from "./components/day/day";

export const getDateFromDays = (date: Date, days:number = 0): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate
} 