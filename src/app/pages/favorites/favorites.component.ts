import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, Subscription, timer } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';
import { UpdateCurrentForecastAction } from 'src/app/core/store/current-forecast/current-forecast.actions';
import { AddFavoriteAction } from 'src/app/core/store/favorites/favorites.actions';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { State } from '../../core/reducers/index';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favorites$!: Observable<Forecast[]>;
  getAll$!: Subscription;
  favorite$!: Subscription;

  constructor(private store: Store<State>, private router: Router, private dbService: NgxIndexedDBService, private errorService: ErrorService) { }

  ngOnDestroy(): void {
    this.getAll$.unsubscribe();
    this.favorite$.unsubscribe()
  }

  ngOnInit(): void {
    this.favorites$ = this.store.select((store) => store.favorites);
    this.getAll$ = this.dbService.getAll('favorites-cities').subscribe({
      next: (Favorites: any) => {
        Favorites.forEach((newFavorite: any) => {
          let save = true;
          this.favorite$ = this.favorites$.subscribe((favorites: any) => {
            favorites.forEach((favorite: any) => {
              if (newFavorite.key === favorite.key) save = false;
            });
          });
          if (save) {
            this.store.dispatch(new AddFavoriteAction(newFavorite));
          }
        });
      },
      error: (error: any) => {
        this.errorService.showErrorToast(error.error);
      }
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


