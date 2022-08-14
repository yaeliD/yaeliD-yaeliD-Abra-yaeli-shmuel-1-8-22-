import { Forecast } from 'src/app/shared/models/forecast.model';
import { currentForecastAction, currentForecastActionType } from './current-forecast.actions';

export const initialState: Forecast = {
  cityName: '',
  icon: 0,
  temperature: 0,
  unit: '',
  weatherText: '',
  date: undefined,
  key: undefined
};

export function currentForecastReducer(state: Forecast = initialState, action: currentForecastAction): Forecast {
  switch (action.type) {
    case currentForecastActionType.UPDATE_FAVORITE:
      return { ...action.payload };
    default:
      return state;
  }
}

