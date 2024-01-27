import moment from "moment";

export function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const timeFromTo = (date: Date | string, timeDiff?: number) => {
    const timeFrom = moment(date).format("h:mm A").replace(":01", ":00")
    const timeTo = moment(date).add(timeDiff, "h").format("h:mm A").replace(":01", ":00")
    const minifiedDate = moment(date).format("ddd, MMM D")
    return { timeFrom, timeTo, minifiedDate }
}