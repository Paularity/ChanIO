import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrimengModules } from '../../modules/primeng-modules';
import { Message, MessageService } from 'primeng/api';
import { AppLoaderComponent } from '../../components/app-loader/app-loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule, PrimengModules, ReactiveFormsModule, AppLoaderComponent],
  providers: [MessageService],
  standalone: true,
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  loginForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  // returnUrl: string;
  error: any;
  opacity = 0;

  errorMessages: Message[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }

    setTimeout(() => {
      this.opacity = 1;
    }, 600);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.error = false;
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // timeout for animation purpose
    setTimeout(() => {
      if (this.authService.login(this.f.username.value, this.f.password.value)) {
        this.errorMessages = [];
        // Redirect or update the UI on successful login
        console.log('Login successful');
        this.router.navigate(['']);
      } else {
        this.errorMessages = [{ severity: 'error', detail: 'Invalid username or password' }];
      }

      this.loading = false;
    }, 1000);
  }
}
