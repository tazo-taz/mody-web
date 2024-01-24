const geoNumPrefix = "+995"

export const toGeoNumber = (num: string) => {
    if (num.startsWith(geoNumPrefix)) return num
    return geoNumPrefix + num
}