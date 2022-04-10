import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Angajati } from 'src/app/models/angajati.model';
import { AngajatiService } from 'src/app/services/angajati.service';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-angajati-dialog',
  templateUrl: './angajati-dialog.component.html'
})
export class AngajatiDialogComponent implements OnInit {

    angajat: Angajati;
    formData: FormGroup;
    angajatNou: number = 1;

    constructor(public dialogRef: MatDialogRef<AngajatiDialogComponent>, private angajatiService: AngajatiService,
        @Inject(MAT_DIALOG_DATA) public data: any, private _adapter: DateAdapter<any>, private httpService: HttpService) { 
            this._adapter.setLocale('ro');
            
            this.formData = new FormGroup({
                id: new FormControl(),
                nume: new FormControl(),
                adresa: new FormControl(),
                oras: new FormControl(),
                cnp: new FormControl(),
                data_angajarii: new FormControl(),
                durata_contract: new FormControl()
            })

            if (data) {
                this.angajatNou = 0;
                console.log("Editare!")
                if (data.angajat) {
                    this.angajat = data.angajat;
                }

                this.formData.patchValue({
                    'id': this.angajat.id,
                    'nume': this.angajat.nume,
                    'adresa': this.angajat.adresa,
                    'oras': this.angajat.oras,
                    'cnp': this.angajat.cnp,
                    'data_angajarii': this.angajat.data_angajarii,
                    'durata_contrat': this.angajat.durata_contract
                });
            }

            
    }

    ngOnInit(): void {
    }

    cancel() {
        this.dialogRef.close();
    }
    
    saveAngajat() {
        // this.angajat.id = 0;
        // this.angajat;
        console.log(this.formData.value);
        let angajat = this.formData.value;
        this.httpService.adaugaAngajat(angajat).subscribe((response: any) => {
            this.dialogRef.close();
        });
        // this.angajatiService.salveazaAngajat(this.angajat);
        // console.log("informatii salvate: data: " + this.dataIncasare + ", suma: " + this.sumaIncasata + ", modalitate: " + this.modalitateIncasare);
    }
    
    getDate(value) {
        const date = value;
        if (!date) {
            return date;
        }
        date.setHours(date.getHours() + 6);
        return date.toISOString().split('T')[0];
    }

    
}
