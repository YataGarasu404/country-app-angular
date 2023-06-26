import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStorage{

    byCapital:    CountrySearchData;
    byCountry:    CountrySearchData;
    byRegion:     RegionSearchData;
}

export interface CountrySearchData{

    term:         string;
    countries:    Country[];
}

export interface RegionSearchData{

    region:        Region;
    countries:    Country[];
}