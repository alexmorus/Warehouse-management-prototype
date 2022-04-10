import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Documente } from 'src/app/models/documente.model';
import { Produse } from 'src/app/models/produse.model';
import { HttpService } from 'src/app/services/http-service.service';
import { ProduseDialogComponent } from '../produse-dialog/produse-dialog.component';

@Component({
  selector: 'app-produse',
  templateUrl: './produse.component.html'
})
export class ProduseComponent implements OnInit {
    
    produse: Produse[] = [];
    documente: Documente[] = [];

    parametru: string;
    valoare: string;
    data: Date;

    coloane = ['model', 'descriere', 'pret', 'poza', 'stoc', 'denumireProducator', 'denumireDistribuitor', 'actiuni'];
    coloaneDoc = ['document', 'data', 'numeAngajat', 'modelProdus'];

    constructor(private httpService: HttpService,
        public dialog: MatDialog) { }


    ngOnInit(): void {
        this.refreshProduse();
        this.refreshDocumente();
    }

    addProdus() {
        console.log("Deschid dialog angajati gol");
        const dialogRef = this.dialog.open(ProduseDialogComponent, {
            width: '400px',
            height: '600px',
            maxWidth: '100%',
            maxHeight: '100%',
            disableClose: true,
        })
        dialogRef.afterClosed().subscribe(result => {
                    console.log('result: ' + result);
                    this.refreshProduse();
                    this.refreshDocumente();
                });
    }

    editProdus(produs: Produse) {
        console.log("Deschid dialog angajati populat cu id " + produs.id);
        const dialogRef = this.dialog.open(ProduseDialogComponent, {
            width: '400px',
            height: '600px',
            maxWidth: '100%',
            maxHeight: '100%',
            disableClose: true,
            data: {tip: "add", produs: produs}
        })
        dialogRef.afterClosed().subscribe(result => {
                    console.log('result: ' + result);
                    this.refreshProduse();
                });
    }

    deleteProdus(produs: Produse) {
        // console.log("Sterg produs cu id " + produs.id);
        this.httpService.stergeProdus(produs).subscribe((response: any) => {
            console.log("Sters produs cu id " + produs.id);
            this.refreshProduse();
            this.refreshDocumente();
        });
    }

    refreshProduse() {
        // this.httpService.filtrareProduse(null, null).subscribe((produse: Produse[]) => {
        //     this.produse = produse;
        // });
        this.filtrareProduse("null", "null");
    }

    refreshDocumente() {
        this.httpService.citireDocumente().subscribe((documente: Documente[]) => {
            this.documente = documente;
        });
    }

    cauta() {
        let val = this.parametru === "null" ? "null" : this.parametru === "after" ? this.getDate(this.data) : this.valoare;
        this.filtrareProduse(this.parametru, val);
    }

    filtrareProduse(parametru: string, valoare: string) {
        this.httpService.filtrareProduse(parametru, valoare).subscribe((produse: Produse[]) => {
            this.produse = produse;
        });
    }

    getDate(value) {
        const date = value;
        if (!date) {
            return date;
        }
        return date.toISOString().split('T')[0];
    }

}