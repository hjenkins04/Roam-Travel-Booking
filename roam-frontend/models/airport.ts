import { Continent, Country, Location } from "@/models";

export interface Airport {
  guid: string;
  full_name: string;
  iata_code: string;
  short_name: string;
  municipality_name: string;
  continent: Continent;
  country: Country;
  location: Location;
}
  