import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angajati } from '../models/angajati.model';
import { Distribuitori } from '../models/distribuitori.model';
import { Producatori } from '../models/producatori.model';
import { Produse } from '../models/produse.model';
import { User } from '../models/user.model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'    
})
export class HttpService extends BaseHttpService {

  base_url="localhost:8080";

  constructor(http: HttpClient)  {
    super( http );
  }

  public login(username: string, parola: string) {
    return this.http.get("/gestiune" + "/api/login/" + username + "/" + parola, {responseType: 'text' as 'json'});
  }

  public register(username: string, parola: string, email: string, rang: string) {
    return this.http.get("/gestiune" + "/api/register/" + username + "/" + parola + "/" + email + "/" + rang);
  }

  public adaugaAngajat(angajat: Angajati) {
    return this.http.post("/gestiune" + "/api/angajati/add/", angajat);
  }

  public citireAngajati() {
    return this.http.get("/gestiune" + "/api/angajati/list");
  }

  public stergeAngajat(angajat: Angajati) {
    return this.http.get("/gestiune" + "/api/angajati/delete/" + angajat.cnp);
  }

  public adaugaProdus(produs: Produse) {
    return this.http.post("/gestiune" + "/api/produse/add/", produs);
  }

  public stergeProdus(produs: Produse) {
    return this.http.get("/gestiune" + "/api/produse/delete/" + produs.id);
  }
 
//   public citireProduse() {
//     return this.http.get("/gestiune" + "/api/produse/list");
//   }

  public filtrareProduse(parametru: string, valoare: string) {
      return this.http.get("/gestiune" + "/api/produse/list/filter/" + parametru + "/" + valoare);
  }

  public adaugaDistribuitor(distribuitor: Distribuitori) {
    return this.http.post("/gestiune" + "/api/distribuitori/add", distribuitor);
  }

  public stergeDistribuitor(distribuitor: Distribuitori) { 
    return this.http.get("/gestiune" + "/api/distribuitori/delete/" + distribuitor.cui);
  }

  public citireDistribuitori() {
    return this.http.get("/gestiune" + "/api/distribuitori/list");
  }

  public adaugaProducator(producator: Producatori) {
    return this.http.post("/gestiune" + "/api/producatori/add", producator);
  }

  public stergeProducator(producator: Producatori) {
    return this.http.get("/gestiune" + "/api/producatori/delete/" + producator.cui);
  }

  public citireProducatori() {
    return this.http.get("/gestiune" + "/api/producatori/list");
  }

  public stergeUtilizator(user: User) {
    return this.http.get("/gestiune" + "/api/users/delete/" + user.id);
  }

  public citireUtilizatori() {
    return this.http.get("/gestiune" + "/api/users/list");
  }

  public citireDocumente() {
      return this.http.get("/gestiune" + "/api/documente/list");
  }
}
