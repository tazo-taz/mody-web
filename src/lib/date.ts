import moment from "moment";

export function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const formatTime = (date: string | Date) =>
    moment(date).format("h:mm A").replace(":01", ":00")

export const minifyDate = (date: Date | string) =>
    moment(date).format("ddd, MMM D")

export const timeFromTo = (date: Date | string, timeDiff?: number, withAmPm: boolean = true) => {
    const timeFrom = formatTime(date)
    const timeTo = moment(date).add(timeDiff, "h").format("h:mm A").replace(":01", ":00")
    const minifiedDate = minifyDate(date)
    return {
        timeFrom: (withAmPm ? timeFrom : timeFrom.slice(0, -3)).padStart(5, "0"),
        timeTo: (withAmPm ? timeTo : timeTo.slice(0, -3)).padStart(5, "0"),
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