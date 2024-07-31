export interface busSystemDatesType {
  trans: string;
  interval_id: string;
  route_id: string;
  bus_id: string;
  route_name: string;
  route_kod: null;
  bustype_id: string;
  has_plan: number;
  bustype: string;
  carrier: string;
  carrier_id: string;
  comfort: string;
  rating: null;
  reviews: null;
  logo: null | string;
  buy: string;
  reserve: number;
  request: string;
  eticket: string;
  only_original: string;
  sum_backdisc: string;
  timetable_id: string;
  request_get_free_seats: number;
  request_get_discount: number;
  request_get_baggage: number;
  buy_open: string;
  day_open: number | string;
  international: string;
  inland: string;
  speed_type: string;
  need_orderdata: string;
  can_cyrillic_orderdata: number;
  need_birth: string;
  need_doc: string;
  need_doc_expire_date: string;
  need_citizenship: string;
  need_gender: string;
  need_middlename: number;
  lock_order: string;
  lock_min: string;
  reserve_min: string;
  max_seats: string;
  start_sale_day: string;
  stop_sale_hours: string;
  cancel_free_min: string;
  date_from: Date;
  time_from: string;
  mktime_from: number;
  point_from: string;
  country_from_id: string;
  point_from_id: string;
  station_from_id: string;
  station_from: string;
  station_from_lat: string;
  station_from_lon: string;
  platform_from: null | string;
  change_route: ChangeRouteElement[] | number;
  date_to: Date;
  time_to: string;
  mktime_to: number;
  point_to: string;
  country_to_id: string;
  point_to_id: string;
  station_to_id: string;
  station_to: string;
  station_to_lat: string;
  station_to_lon: string;
  platform_to: null | string;
  time_in_way: string;
  provision_rate: number;
  price_one_way: number;
  price_one_way_max: number;
  price_two_way: number;
  provision: number;
  currency: string;
  bonus_eur: number;
  discounts: Discount[] | null;
  free_seats_info: FreeSeatsInfo;
  free_seats: number[];
  luggage: null | string;
  route_info: null | string;
  dispatcher_phone: string;
  cancel_hours_info: CancelHoursInfo[] | null;
  route_foto: string[] | null;
  regulations_url: string;
  ws: number;
  stations: Stations;
  search_id: string;
  logo_url?: string;
}

interface CancelHoursInfo {
  hours_after_depar: string;
  hours_before_depar: string;
  cancel_rate: number | string;
  money_back: number;
}

interface ChangeRouteElement {
  date_from: Date;
  time_from: string;
  date_to: Date;
  time_to: string;
  point_from: string;
  point_from_id: string;
  station_from: string;
  station_from_id: string;
  station_from_lat: string;
  station_from_lon: string;
  point_to: string;
  point_to_id: string;
  station_to: string;
  station_to_id: string;
  station_to_lat: string;
  station_to_lon: string;
  distance: string;
  carrier: string;
  free_seats: number[];
  trans: string;
  change_typ?: string;
  change_stations?: number;
  transfer_time?: TransferTime;
}

interface TransferTime {
  d: number;
  h: number;
  m: number;
}

export interface Discount {
  discount_id: string;
  discount_name: string;
  discount_price: number;
}

interface FreeSeatsInfo {
  count: Count;
  current_free_seats_typ: string;
  description: string;
}

interface Count {
  sitting: number;
  standing: number;
}

interface Stations {
  departure: Arrival[];
  arrival: Arrival[];
}

interface Arrival {
  station_id: string;
  point_id: string;
  time: string;
  point_name: string;
  station_name: string;
  lat: string;
  lon: string;
  price?: Price[];
}

interface Price {
  station_id: string;
  price_one_way: number;
}

export type busDatesType = Record<string, string[]>[]