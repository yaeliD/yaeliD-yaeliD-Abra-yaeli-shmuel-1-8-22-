import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error.service';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss']
})
export class ForecastsComponent implements OnChanges {

  @Input() key: any;
  forecasts: any;
  headLine: any;

  constructor(private weatherService: WeatherService, private errorService: ErrorService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key'] && changes['key'].currentValue) {
      this.getFiveDays();
    }
  }

  getFiveDays() {
    this.weatherService.get5DaysOfForecasts(this.key).subscribe({
      next: (fiveDaysForecastData: any) => {
        this.headLine = fiveDaysForecastData.Headline.Text;
        this.forecasts = fiveDaysForecastData.DailyForecasts;
      },
      error: (error: any) => {
        this.errorService.showErrorToast(error.error);
      }
    });
  }
}
