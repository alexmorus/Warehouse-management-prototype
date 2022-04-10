import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';


import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ProduseComponent } from './components/produse/produse.component';
import { ProducatoriComponent } from './components/producatori/producatori.component';
import { DistribuitoriComponent } from './components/distribuitori/distribuitori.component';
import { AngajatiComponent } from './components/angajati/angajati.component';
import { UtilizatoriComponent } from './components/utilizatori/utilizatori.component';
import { AngajatiDialogComponent } from './components/angajati-dialog/angajati-dialog.component';
import { DistribuitoriDialogComponent } from './components/distribuitori-dialog/distribuitori-dialog.component';
import { ProduseDialogComponent } from './components/produse-dialog/produse-dialog.component';
import { ProducatoriDialogComponent } from './components/producatori-dialog/producatori-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProduseComponent,
    ProducatoriComponent,
    DistribuitoriComponent,
    AngajatiComponent,
    UtilizatoriComponent,
    AngajatiDialogComponent,
    DistribuitoriDialogComponent,
    ProducatoriDialogComponent,
    ProduseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule, 
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
