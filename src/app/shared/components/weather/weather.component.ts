import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Forecast } from '../../models/forecast.model';
import { State } from '../../../core/reducers/index';
import { AddFavoriteAction, DeleteFavoriteAction } from 'src/app/core/store/favorites/favorites.actions';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { options } from '../../enums/options.enum';
import { UpdateCurrentForecastAction } from 'src/app/core/store/current-forecast/current-forecast.actions';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/services/error.service';

const DEFAULT_LAT = 32.06056592003395;
const DEFAULT_LNG = 34.78557562374166;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  
})
export class WeatherComponent implements OnInit {

  autoCompletedSuggestions: any;
  selectedCountryAdvanced!: any[];
  forecasts: any;
  options: options = options.Add;
  headLine: any;
  isStart: boolean = true;
  currentForecast$!: Observable<Forecast>;
  domLoaded!: boolean;
  currentForecast: any;
  cityKey: any;
  constructor(private weatherService: WeatherService, private store: Store<State>, private dbService: NgxIndexedDBService, private errorService: ErrorService) {
    this.currentForecast$ = this.store.select((store) => store.currentForecast);
    this.currentForecast$.subscribe({
      next: (res) => {
        this.currentForecast = res;
        this.cityKey = res.key;
        if(res.key) this.isFavorite(res.key);
      },
      error: (error) => {
        console.log(error.status, 'err');
        this.errorService.showErrorToast(error.error);
      }
    }); 
  }

  ngAfterViewInit() {
    if (!sessionStorage.getItem('siteInit')) {
      this.cityDefault();
      sessionStorage.setItem('siteInit', 'true');
    }
  }

  ngOnInit(): void {


  }

  cityDefault() {
    console.log('cityDefault', this.cityDefault);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService.getGeoPosition(latitude, longitude).subscribe({
          next: (data) => {
            this.selectSuggestion(data.Key, data.LocalizedName);
          },
          error: (error: any) => {
            this.errorService.showErrorToast(error.error);          }
        });
      });
    } else {
      this.weatherService.getGeoPosition(DEFAULT_LAT, DEFAULT_LNG).subscribe({
        next: (data) => {
          this.selectSuggestion(data.Key, data.LocalizedName);
        },
        error: (error: any) => {
          this.errorService.showErrorToast(error.error);
        }
      });
    }
  }

  filterCountry(event: any) {
    this.weatherService.getAutoComplete(event).subscribe({
      next: (filtered: any) => {
        console.log('this.filteredCountries0', filtered);
        this.autoCompletedSuggestions = filtered;
      }, error: (error: any) => {
        this.errorService.showErrorToast(error.error);
      }
    });
  }

  isFavorite(key: any) {
    this.dbService.getAll('favorites-cities').subscribe({
      next: (favorites) => {
        let favorite: any = favorites.filter((f: any) => { return f.key === key })
        if (favorite.length > 0) {
          this.options = options.Delete;
          return favorite[0].id;
        } else {
          this.options = options.Add;
          return null;
        }
      }, error: (error: any) => {
        this.errorService.showErrorToast(error.error);
      }
    });
  }

  selectSuggestion(key: any, name: any) {
    this.weatherService.getCurrentWeatherByKeyCity(key).subscribe({
      next: (res) => {
        let id = this.isFavorite(key);
        console.log('selectCity', res);
        this.store.dispatch(new UpdateCurrentForecastAction({
          cityName: name,
          icon: res[0].WeatherIcon,
          temperature: res[0].Temperature.Metric.Value,
          unit: res[0].Temperature.Metric.Unit,
          weatherText: res[0].WeatherText,
          key: key,
          id: id
        }));

      }, error: (error: any) => {
        this.errorService.showErrorToast(error.error);
      }
    });
    this.autoCompletedSuggestions = null;
  }


  updateFavorite() {
    let obj: Forecast = {
      cityName: this.currentForecast.cityName,
      icon: this.currentForecast.icon,
      temperature: this.currentForecast.temperature,
      unit: this.currentForecast.unit,
      weatherText: this.currentForecast.weatherText,
      key: this.currentForecast.key
    }
    switch (this.options) {
      case options.Add:
        this.dbService.add('favorites-cities', obj).subscribe({
          next: () => {
            this.store.dispatch(new AddFavoriteAction(this.currentForecast));
            this.options = options.Delete;
          },
          error: (error: any) => {
            this.errorService.showErrorToast(error.error);
          }
        });
        break;
      case options.Delete:
        console.log('Delete');

        this.dbService.deleteByKey('favorites-cities', this.currentForecast.id).subscribe({
          next: (status) => {
            this.store.dispatch(new DeleteFavoriteAction(this.currentForecast));
            this.options = options.Add;
          }, error: (error: any) => {
            this.errorService.showErrorToast(error.error);
          }
        });
    }
  }


}

