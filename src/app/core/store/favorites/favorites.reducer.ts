import { Forecast } from 'src/app/shared/models/forecast.model';
import { FavoriteAction, FavoriteActionType } from './favorites.actions';

// export const initialState: any = [];

export function FavoritesReducer(state: Forecast[] = [], action: FavoriteAction): Forecast[] {
  switch (action.type) {
    case FavoriteActionType.ADD_FAVORITE:
      console.log('ADD_FAVORITE', [...state, action.payload], state, state.length);
      return [...state, action.payload];
    case FavoriteActionType.DELETE_FAVORITE:
      console.log('DELETE_FAVORITE', [...state.filter(item => action.payload.key !== item.key)], state, state.length);
      return [...state.filter(item => action.payload.key !== item.key)];
    default:
      return state;
  }
}

