import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: User;
    // userClass: string;

    constructor(
        private router: Router,
        private authenticationService: AuthService, 
        private loginService: LoginService
    ) {
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    isAuthenticated() {
        return this.loginService.isAuthenticated();
    }    

    clasaUtilizator() {
        return localStorage.getItem("role");
    }

    logout() {
        this.authenticationService.logout();
        this.loginService.logout();
        // this.router.navigate(['/login']);
    }
}
