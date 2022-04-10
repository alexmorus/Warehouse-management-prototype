import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-utilizatori',
  templateUrl: './utilizatori.component.html'
})
export class UtilizatoriComponent implements OnInit {

  utilizatori: User[] = [];

  coloane = ['username', 'email', 'rang', 'actiuni'];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
      this.refreshUsers();
  }

  deleteUser(utilizator: User) {
    //   console.log("Sterg user cu id " + utilizator.id);
    this.httpService.stergeUtilizator(utilizator).subscribe((response: any) => {
      console.log("Sters user cu id " + utilizator.id);
      this.refreshUsers();
    });
  }

  refreshUsers() {
      this.httpService.citireUtilizatori().subscribe((utilizatori: User[]) => {
          this.utilizatori = utilizatori;
      });
  }

}
