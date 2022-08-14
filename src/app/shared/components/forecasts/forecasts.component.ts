import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/services/error.service';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss']
})
export class ForecastsComponent implements OnInit, OnChanges {

  @Input() key: any;
  forecasts: any;
  headLine: any;
  constructor(private weatherService: WeatherService, private errorService: ErrorService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key'] && changes['key'].currentValue ){
      this.getFiveDays();
    }
    console.log('ngOnChanges');

  }

  ngOnInit(): void {
  }

  getFiveDays() {
    console.log('getFiveDays');
    this.weatherService.get5DaysOfForecasts(this.key).subscribe({
      next: (fiveDaysForecastData: any) => {
        console.log('fiveDaysForecastData',fiveDaysForecastData);
        
        this.headLine = fiveDaysForecastData.Headline.Text;
        this.forecasts = fiveDaysForecastData.DailyForecasts;
      },
      error:(error: any)=>{
        console.log('error',error.error);
        this.errorService.showErrorToast(error.error);
      }
    });
  }
}
