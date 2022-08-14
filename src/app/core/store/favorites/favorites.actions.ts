import { Action } from '@ngrx/store';
import { Forecast } from 'src/app/shared/models/forecast.model';

export enum FavoriteActionType {
  ADD_FAVORITE = '[FAVORITE] Add FAVORITE',
  DELETE_FAVORITE = '[FAVORITE] Delete FAVORITE',
}

export class AddFavoriteAction implements Action {
  readonly type = FavoriteActionType.ADD_FAVORITE;
  constructor(public payload: Forecast) { }
}

export class DeleteFavoriteAction implements Action {
  readonly type = FavoriteActionType.DELETE_FAVORITE;
  constructor(public payload: Forecast) { }
}

export type FavoriteAction = AddFavoriteAction | DeleteFavoriteAction;

