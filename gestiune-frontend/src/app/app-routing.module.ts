import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngajatiComponent } from './components/angajati/angajati.component';
import { DistribuitoriComponent } from './components/distribuitori/distribuitori.component';
import { LoginComponent } from './components/login/login.component';
import { ProducatoriComponent } from './components/producatori/producatori.component';
import { ProduseComponent } from './components/produse/produse.component';
import { UtilizatoriComponent } from './components/utilizatori/utilizatori.component';


const routes: Routes = [
    // {path: '', component: LoginComponent},
    {path: '', component: ProduseComponent},
    {path: 'producatori', component: ProducatoriComponent},
    {path: 'distribuitori', component: DistribuitoriComponent},
    {path: 'angajati', component: AngajatiComponent},
    {path: 'utilizatori', component: UtilizatoriComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
