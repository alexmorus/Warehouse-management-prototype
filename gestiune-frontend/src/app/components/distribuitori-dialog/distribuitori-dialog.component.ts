import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Distribuitori } from 'src/app/models/distribuitori.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-distribuitori-dialog',
  templateUrl: './distribuitori-dialog.component.html'
})
export class DistribuitoriDialogComponent implements OnInit {

    distribuitor: Distribuitori;
    formData: FormGroup;
    distribuitorNou: number = 1;

    constructor(public dialogRef: MatDialogRef<DistribuitoriDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) { 
            
            this.formData = new FormGroup({
                id: new FormControl(),
                denumire: new FormControl(),
                adresa: new FormControl(),
                oras: new FormControl(),
                cui: new FormControl(),
                valabilitateContract: new FormControl()
            });

            if (data) {
                this.distribuitorNou = 0;
                console.log("Editare!")
                if (data.distribuitor) {
                    this.distribuitor = data.distribuitor;
                }

                this.formData.patchValue({
                    'id': this.distribuitor.id,
                    'denumire': this.distribuitor.denumire,
                    'adresa': this.distribuitor.adresa,
                    'oras': this.distribuitor.oras,
                    'cui': this.distribuitor.cui,
                    'valabilitateContract': this.distribuitor.valabilitateContract
                });
            }

            
    }

    ngOnInit(): void { 
    }

    cancel() {
        this.dialogRef.close();
    }
    
    saveDistribuitor() {
        console.log(this.formData.value);
        let distribuitor = this.formData.value;
        this.httpService.adaugaDistribuitor(distribuitor).subscribe((response: any) => {
            this.dialogRef.close();
        });
    }

}
