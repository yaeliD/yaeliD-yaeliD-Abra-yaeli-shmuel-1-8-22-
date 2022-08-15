import { Component, Input } from '@angular/core';
import { Forecast } from '../../models/forecast.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  @Input() favorite!: Forecast;
}
