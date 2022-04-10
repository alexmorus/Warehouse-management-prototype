import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Distribuitori } from 'src/app/models/distribuitori.model';
import { HttpService } from 'src/app/services/http-service.service';
import { DistribuitoriDialogComponent } from '../distribuitori-dialog/distribuitori-dialog.component';

@Component({
  selector: 'app-distribuitori',
  templateUrl: './distribuitori.component.html'
})
export class DistribuitoriComponent implements OnInit {

    distribuitori: Distribuitori[] = [];

    coloane = ['denumire', 'adresa', 'oras', 'cui', 'valabilitate_contract', 'nrProd', 'actiuni'];
    constructor(public dialog: MatDialog,
                private httpService: HttpService) {}

    ngOnInit(): void {
        this.refreshDistribuitori();
        console.log(JSON.stringify(this.distribuitori));
    }

    addDistribuitor() {
        console.log("Deschid dialog angajati gol");
        const dialogRef = this.dialog.open(DistribuitoriDialogComponent, {
            width: '400px',
            height: '600px',
            maxWidth: '100%',
            maxHeight: '100%',
            disableClose: true,
        })
        dialogRef.afterClosed().subscribe(result => {
                    console.log('result: ' + result);
                    this.refreshDistribuitori();
                  });
    }

    editDistribuitor(distribuitor: Distribuitori) {
        console.log("Deschid dialog distribuitor populat cu id " + distribuitor.id);
        const dialogRef = this.dialog.open(DistribuitoriDialogComponent, {
            width: '400px',
            height: '600px',
            maxWidth: '100%',
            maxHeight: '100%',
            disableClose: true,
            data: {tip: "add", distribuitor: distribuitor}
        })
        dialogRef.afterClosed().subscribe(result => {
                    console.log('result: ' + result);
                    this.refreshDistribuitori();
                  });
    }

    deleteDistribuitor(distribuitor: Distribuitori) {
        // console.log("Sterg distibuitor cu id " + distribuitor.id);
        this.httpService.stergeDistribuitor(distribuitor).subscribe((response: any) => {
            console.log("Sters distribuitor cu id " + distribuitor.id);
            this.refreshDistribuitori();
        });
    }

    refreshDistribuitori() {
        this.httpService.citireDistribuitori().subscribe((distribuitori: Distribuitori[]) => {
            this.distribuitori = distribuitori;
        })
    }
  
}
