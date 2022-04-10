import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producatori } from 'src/app/models/producatori.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-producatori-dialog',
  templateUrl: './producatori-dialog.component.html'
})
export class ProducatoriDialogComponent implements OnInit {

        producator: Producatori;
        formData: FormGroup;
        producatorNou: number = 1;
    
        constructor(public dialogRef: MatDialogRef<ProducatoriDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) { 
                
                this.formData = new FormGroup({
                    id: new FormControl(),
                    denumire: new FormControl(),
                    adresa: new FormControl(),
                    oras: new FormControl(),
                    cui: new FormControl(),
                    // nrProd: new FormControl()
                });
    
                if (data) {
                    this.producatorNou = 0;
                    console.log("Editare!")
                    if (data.producator) {
                        this.producator = data.producator;
                    }
    
                    this.formData.patchValue({
                        'id': this.producator.id,
                        'denumire': this.producator.denumire,
                        'adresa': this.producator.adresa,
                        'oras': this.producator.oras,
                        'cui': this.producator.cui,
                        // 'nrProd': this.producator.nrProd
                    });
                }
    
                
        }
    
        ngOnInit(): void { 
        }
    
        cancel() {
            this.dialogRef.close();
        }
        
        saveProducator() {
            console.log(this.formData.value);
            let producator = this.formData.value;
            this.httpService.adaugaProducator(producator).subscribe((response: any) => {
                this.dialogRef.close();
            });
        }

    }
    