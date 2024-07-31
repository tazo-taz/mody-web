import moment from "moment";
import { busSystemDatesType } from "../hooks/firebase/useSearchTickets/types";

export function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const formatTime = (date: string | Date, withAmPm: boolean = true) =>
    moment(date).format(`${withAmPm ? "h:mm A" : "HH:mm"}`).replace(":01", ":00")

export const minifyDate = (date?: Date | string) =>
    moment(date).format("ddd, MMM D")

export const timeFromTo = (date: Date | string, timeDiff?: number, withAmPm: boolean = true) => {
    const timeFrom = formatTime(date, withAmPm)
    const timeTo = moment(date).add(timeDiff, "h").format(`${withAmPm ? "h:mm A" : "HH:mm"}`).replace(":01", ":00")
    const minifiedDate = minifyDate(date)
    return {
        timeFrom,
        timeTo,
        minifiedDate
    }
}

export const timeToFrom = (date: Date | string, timeDiff?: number, withAmPm?: boolean) => {
    const timeFrom = formatTime(date)
    const timeTo = moment(date).subtract(timeDiff, "h").format("h:mm A").replace(":01", ":00")
    const minifiedDate = minifyDate(date)
    return {
        timeFrom: (withAmPm ? timeFrom : timeFrom.slice(0, -3)).padStart(5, "0"),
        timeTo: (withAmPm ? timeTo : timeTo.slice(0, -3)).padStart(5, "0"),
        minifiedDate
    }
}

export const timeDifference = (date1: Date | string, date2: Date | string) => {
    var diff = new Date(date2).getTime() - new Date(date1).getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    return `${hh}:${mm}`
}

export const getFullDayAndMonth = (date: Date) => {
    return moment(date).format("dddd, D MMMM")
}

export function dayDiff(from: Date, to: Date) {
    return Math.ceil((from.getTime() - to.getTime()) / (1000 * 60 * 60 * 24));
}

export function isSameDate(date1?: Date, date2?: Date) {
    if (date1 && date2)
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
}

export function extractTimesFromBusSystemRoute(route: busSystemDatesType) {
    const { time_from, time_to, date_from, date_to } = route;

    const dateFrom = date_from + "T" + time_from
    const dateTo = date_to + "T" + time_to

    const timeFrom = formatTime(dateFrom)
    const timeTo = formatTime(dateTo)
    const [hoursDiff, minsDiff] = timeDifference(dateFrom, dateTo).split(":")
    const timeDiff = +((+hoursDiff + +minsDiff / 60).toFixed(2))

    return {
        timeFrom,
        timeTo,
        dateFrom,
        dateTo,
        timeDiff
    }
};