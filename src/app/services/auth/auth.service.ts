// auth.service.ts

import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly encryptionKey = 'xchan5139';

  private username = 'user';
  private password = 'testtest@SM123';

  // Simulate a login method
  login(username: string, password: string): boolean {
    // Replace with actual authentication logic
    if (username === this.username && password === this.password) {
      sessionStorage.setItem(this.TOKEN_KEY, this.encrypt(this.username)); 
      return true;
    } else {
      return false;
    }
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    var token = sessionStorage.getItem(this.TOKEN_KEY);
    return token !== null && this.username === this.decrypt(token);
  }

  // Method to log out and clear the session token
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  encrypt(val: string): string {
    return CryptoJS.AES.encrypt(val, this.encryptionKey).toString();
  }

  decrypt(val: string): string {
    const bytes = CryptoJS.AES.decrypt(val, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
