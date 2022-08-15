import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern('^[a-zA-Z\u05D0-\u05EA]+$')]]
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  onSubmit(): void {
    // save user in storage and in service
    this.authService.login(this.userName?.value || '');
    this.router.navigate(['/home']);
  }

  get userName() {
    return this.loginForm.get('userName');
  }

}
