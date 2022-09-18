import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeatherData} from "../models/weather.data";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly url = "https://api.open-meteo.com/v1/forecast?latitude=45.76&longitude=4.87&current_weather=true";

  constructor(private readonly http: HttpClient) { }

  getWeatherData(): Observable<WeatherData> {
    return this.http.get(this.url);
  }
}
