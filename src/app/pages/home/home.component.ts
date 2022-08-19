import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userName = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.authService.getUser();
  }

  showFavorites() {
    this.router.navigate(['/favorites']);
  }
}
