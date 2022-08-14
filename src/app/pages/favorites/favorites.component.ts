import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, timer } from 'rxjs';
import { UpdateCurrentForecastAction } from 'src/app/core/store/current-forecast/current-forecast.actions';
import { AddFavoriteAction } from 'src/app/core/store/favorites/favorites.actions';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { State } from '../../core/reducers/index';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$!: Observable<Forecast[]>;

  constructor(private store: Store<State>, private router: Router, private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
    this.favorites$ = this.store.select((store) => store.favorites);
    this.dbService.getAll('favorites-cities').subscribe({
      next: (Favorites: any) => {
        Favorites.forEach((newFavorite: any) => {
          let save = true;
          this.favorites$.subscribe((favorites: any) => {
            favorites.forEach((favorite: any) => {
              if (newFavorite.key === favorite.key) save = false;
            });
          });
          if (save) {
            this.store.dispatch(new AddFavoriteAction(newFavorite));
          }
        });
      },
      error: () => { }
    })
  }

  showDetailsFavorite(favorite: Forecast) {
    this.store.dispatch(new UpdateCurrentForecastAction(favorite));
    this.router.navigate(['/home']);
  }


  home() {
    this.router.navigate(['/home']);
  }

}


