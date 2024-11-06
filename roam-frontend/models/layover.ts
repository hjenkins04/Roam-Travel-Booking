import { Airport } from "@/models";

export interface Layover {
    guid: string;
    airport: Airport;
    duration_minutes: number;
  }