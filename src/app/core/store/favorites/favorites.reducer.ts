import { Forecast } from 'src/app/shared/models/forecast.model';
import { FavoriteAction, FavoriteActionType } from './favorites.actions';

export function FavoritesReducer(state: Forecast[] = [], action: FavoriteAction): Forecast[] {
  switch (action.type) {
    case FavoriteActionType.ADD_FAVORITE:
      return [...state, action.payload];
    case FavoriteActionType.DELETE_FAVORITE:
      return [...state.filter(item => action.payload.key !== item.key)];
    default:
      return state;
  }
}

