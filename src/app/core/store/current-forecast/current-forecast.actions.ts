import { Action } from '@ngrx/store';
import { Forecast } from 'src/app/shared/models/forecast.model';

export enum currentForecastActionType {
  UPDATE_FAVORITE = '[FAVORITE] Update FAVORITE',
}

export class UpdateCurrentForecastAction implements Action {
  readonly type = currentForecastActionType.UPDATE_FAVORITE;
  constructor(public payload: Forecast) { }
}

export type currentForecastAction = UpdateCurrentForecastAction;

