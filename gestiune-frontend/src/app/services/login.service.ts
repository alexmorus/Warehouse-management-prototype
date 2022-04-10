import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username: string;
  parola: string;
  clasa: string = null;


  constructor(private httpService: HttpService, private http: HttpClient) { }

  login(username: string, parola: string) {
    // this.http.get("http://localhost:8080/api/login/" + username + "/" + password).subscribe((clasa: string) => {
    //     if (clasa !== "unknown") {
    //         this.clasa = clasa;
    //         this.username = username;
    //         this.parola = parola;
    //         console.log("Userul curent are clasa " + clasa);
    //     }

    //     return this.isAuthenticated();
    //   });

      this.httpService.login(username, parola).subscribe((clasa: string) => {
        if (clasa !== "unknown") {
            this.clasa = clasa;
            this.username = username;
            this.parola = parola;
            console.log("Userul curent are clasa " + clasa);
            localStorage.setItem("role", this.clasa);
        }

        return this.isAuthenticated();
      });

    // this.username = username;
    // this.parola = parola;
    // if (this.username === "admin")
    //     this.clasa = 'admin';
    // else 
    //     this.clasa = 'user';
    //   return this.isAuthenticated();
    return false;
  }

  logout() {
      this.username = null;
      this.parola = null;
      this.clasa = null;
      localStorage.removeItem("role");
  }

  isAuthenticated() {
    //   console.log("role local : " + localStorage.getItem("role"));
      return localStorage.getItem("role") !== null;
  }

  isAdmin() {
      return localStorage.getItem("role") === "admin";
  }

  register(username: string, parola: string, email: string, rang: string) {
    return this.httpService.register(username, parola, email, rang);
  }
}
