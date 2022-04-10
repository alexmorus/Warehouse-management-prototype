import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Angajati } from 'src/app/models/angajati.model';
import { AngajatiService } from 'src/app/services/angajati.service';
import { HttpService } from 'src/app/services/http-service.service';
import { AngajatiDialogComponent } from '../angajati-dialog/angajati-dialog.component';

@Component({
  selector: 'app-angajati',
  templateUrl: './angajati.component.html'
})
export class AngajatiComponent implements OnInit {

    angajati: Angajati[] = [];

    coloane = ['nume', 'adresa', 'oras', 'cnp', 'data_angajarii', 'durata_contract', 'nrProd', 'actiuni'];
    constructor(private angajatiService: AngajatiService,
                public dialog: MatDialog,
                private httpService: HttpService) {}

    ngOnInit(): void {
        this.refreshAngajati();
    }

    addAngajat() {
        console.log("Deschid dialog angajati gol");
        const dialogRef = this.dialog.open(AngajatiDialogComponent, {
            width: '400px',
            height: '600px',
            maxWidth: '100%',
            maxHeight: '100%',
            disableClose: true,
        })
        dialogRef.afterClosed().subscribe(result => {
                    console.log('result: ' + result);
                    this.refreshAngajati();
                  });
    }

    editAngajat(angajat: Angajati) {
        console.log("Deschid dialog angajati populat cu id " + angajat.id);
        const dialogRef = this.dialog.open(AngajatiDialogComponent, {
            width: '400px',
            height: '600px',
            maxWidth: '100%',
            maxHeight: '100%',
            disableClose: true,
            data: {tip: "add", angajat: angajat}
        })
        dialogRef.afterClosed().subscribe(result => {
                    console.log('result: ' + result);
                    this.refreshAngajati();
                  });
    }

    // deleteAngajat(angajat: Angajati) {
    //     // console.log("Sterg angajat cu id " + angajat.id);
    //     this.httpService.stergeAngajat(angajat).subscribe((response: any) => {
    //         console.log("Sters angajat cu id " + angajat.id);
    //     });
    // }

    refreshAngajati() {
        this.httpService.citireAngajati().subscribe((angajati: Angajati[]) => {
            this.angajati = [];
            for (let angajat of angajati) {
                this.angajati.push(angajat);
            }
            this.angajati.sort((a, b) => {return +a.id - +b.id});
        })
    }
  
}
