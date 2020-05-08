import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    if (this.isLoginMode) {
      console.log('nyi');
    } else {
      this.isLoading = true;
      const email = authForm.value.email;
      const password = authForm.value.password;
      this.authService.signUp(email, password)
        .subscribe(respData => {
            console.log(respData);
            this.isLoading = false;
          },
          error => {
            console.log(error);
            this.error = 'An error occurred!';
            this.isLoading = false;
          });
    }
    authForm.reset();
  }
}
