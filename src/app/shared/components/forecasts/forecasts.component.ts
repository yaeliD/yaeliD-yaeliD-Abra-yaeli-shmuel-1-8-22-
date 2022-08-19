import { Component, Input } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error.service';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss']
})
export class ForecastsComponent {

  @Input() set key(value: any) {
    if(value) this.getFiveDays(value);
  }
  forecasts: any;
  headLine: any;

  constructor(private weatherService: WeatherService, private errorService: ErrorService) { }

  getFiveDays(key: any) {
    this.weatherService.get5DaysOfForecasts(key).subscribe({
      next: (fiveDaysForecastData) => {
        this.headLine = fiveDaysForecastData.Headline.Text;
        this.forecasts = fiveDaysForecastData.DailyForecasts;
      },
      error: (error) => {
        this.errorService.showErrorToast(error.error);
      }
    });
  }
}
