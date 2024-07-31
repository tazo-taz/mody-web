export interface VagonFloor {
  number: number;
  rows: Rows;
}

interface Rows {
  row: Row[];
}

interface Row {
  seat: Array<SeatType>;
}

export type SeatType = SeatClass | string;

interface SeatClass {
  "@attributes": Attributes;
}

interface Attributes {
  icon: string;
}
