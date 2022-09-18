import {CurrentWeather} from "./current-weather.model";

export class WeatherData {
  latitude?:string;
  longitude?:string;
  generationtime_ms?:string;
  utc_offset_seconds?:string;
  timezone?:string;
  timezone_abbreviation?:string;
  elevation?:string;
  current_weather?: CurrentWeather;
}
