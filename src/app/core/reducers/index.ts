import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as Favorites from '../store/favorites/favorites.reducer';
import * as CFavorite from '../store/current-forecast/current-forecast.reducer';
import { Forecast } from 'src/app/shared/models/forecast.model';


export interface State {
  favorites:Forecast[],
  currentForecast:Forecast

}

export const reducers: ActionReducerMap<State, any> = {
  favorites: Favorites.FavoritesReducer,
  currentForecast: CFavorite.currentForecastReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
