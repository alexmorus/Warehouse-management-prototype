import { analyzeNgModules } from '@angular/compiler';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Angajati } from 'src/app/models/angajati.model';
import { Distribuitori } from 'src/app/models/distribuitori.model';
import { Producatori } from 'src/app/models/producatori.model';
import { Produse } from 'src/app/models/produse.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-produse-dialog',
  templateUrl: './produse-dialog.component.html'
})
export class ProduseDialogComponent implements OnInit {

    produs: Produse;
    formData: FormGroup;
    produsNou: number = 1;
    producatori: Producatori[] = [];
    distribuitori: Distribuitori[] = [];
    angajati: Angajati[] = [];

    constructor(public dialogRef: MatDialogRef<ProduseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) { 
            
            this.formData = new FormGroup({
                id: new FormControl(),
                model: new FormControl(),
                descriere: new FormControl(),
                poza: new FormControl(),
                pret: new FormControl(),
                stoc: new FormControl(),
                producator: new FormControl(),
                distribuitor: new FormControl(),
                angajatPreluare: new FormControl(),
                dataIntrare: new FormControl(new Date()), 
                documentIntrare: new FormControl(),
            });

            if (data) {
                this.produsNou = 0;
                console.log("Editare!")
                if (data.produs) {
                    this.produs = data.produs;
                }

                this.formData.patchValue({
                    'id': this.produs.id,
                    'model': this.produs.model,
                    'descriere': this.produs.descriere,
                    'poza': this.produs.poza,
                    'pret': this.produs.pret,
                    'stoc': this.produs.stoc,
                    'dataIntrare': new Date(this.produs.dataIntrare),
                    'documentIntrare': this.produs.documentIntrare
                    // 'distribuitor': this.produs.distribuitor,
                    // 'producator': this.produs.producator
                });
            }

            
    }

    ngOnInit(): void { 
        
        this.httpService.citireAngajati().subscribe( (angajati: Angajati[]) => {
            this.angajati = angajati;
        
            this.httpService.citireDistribuitori().subscribe( (distribuitori: Distribuitori[]) => {
                this.distribuitori = distribuitori;
                
                this.httpService.citireProducatori().subscribe( (producatori: Producatori[]) => {
                    this.producatori = producatori;

                    if (this.produsNou === 0) {
                        let producator = null;
                        let distribuitor = null;
                        let angajat = null;
                
                        for (let prod of this.producatori) {
                            if (prod.denumire === this.produs.denumireProducator) {
                                producator = prod;
                            }
                        }
                        for (let dist of this.distribuitori) {
                            if (dist.denumire === this.produs.denumireDistribuitor) {
                                distribuitor = dist;
                            }
                        }
                        for (let ang of this.angajati) {
                            if (ang.id === this.produs.idAngajatPreluare) {
                                angajat = ang;
                            }
                        }
                        console.log("Distr + prod " + distribuitor + ' ' + producator);
                
                        this.formData.patchValue({
                            'distribuitor': distribuitor,
                            'producator': producator,
                            'angajatPreluare': angajat
                        });
                    }
                });
            });
        });
        
        
    }

    cancel() {
        this.dialogRef.close();
    }
    
    saveProdus() {
        console.log(this.formData.value);
        let produs = this.formData.value;
        produs.idAngajatPreluare = this.formData.controls['angajatPreluare'].value.id;
        this.httpService.adaugaProdus(produs).subscribe((response: any) => {
            this.dialogRef.close();
        });
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
