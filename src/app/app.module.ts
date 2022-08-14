import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { WeatherComponent } from './shared/components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForecastsComponent } from './shared/components/forecasts/forecasts.component';
import { ForecastComponent } from './shared/components/forecast/forecast.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FavoriteComponent } from './shared/components/favorite/favorite.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { AccuweatherIconPipe } from './shared/pipes/accuweather-icon.pipe';

export function migrationFactory() {
  return {
    1: (db: any, transaction: any) => {
      const store = transaction.objectStore('favorites-cities');
      store.createIndex('city', 'city', { unique: false });
      // var transaction = db.transaction(["city"], 'tel aviv');

    },
    3: (db:any, transaction:any) => {
      const store = transaction.objectStore('users');
      store.createIndex('userName', 'userName', { unique: false });
      // var transaction = db.transaction(["userName"], 'yaeli');
    }
  };
}

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 3,
  objectStoresMeta: [{
    store: 'favorites-cities',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'key', keypath: 'Key', options: { unique: true } },
      { name: 'temperature', keypath: 'temperature', options: { unique: false } },
      { name: 'icon', keypath: 'icon', options: { unique: false } },
      { name: 'weatherText', keypath: 'weatherText', options: { unique: false } },
      { name: 'unit', keypath: 'unit', options: { unique: false } },
    ]
  }, {
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'userName', keypath: 'userName', options: { unique: true } },
    ]
  }],
  migrationFactory
};




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WeatherComponent,
    ForecastsComponent,
    ForecastComponent,
    FavoritesComponent,
    FavoriteComponent,
    AccuweatherIconPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastContainerModule,
    // NgrxStoreIdbModule.forRoot({keys: ['favorites']}),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgxIndexedDBModule.forRoot(dbConfig),
    // NgrxStoreIdbModule.forRoot({keys:[{}]}),
    BrowserAnimationsModule , 
    ToastrModule . forRoot () ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
