import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producatori } from 'src/app/models/producatori.model';
import { HttpService } from 'src/app/services/http-service.service';
import { ProducatoriDialogComponent } from '../producatori-dialog/producatori-dialog.component';

@Component({
  selector: 'app-producatori',
  templateUrl: './producatori.component.html'
})
export class ProducatoriComponent implements OnInit {

  producatori: Producatori[] = [];

  coloane = ['denumire', 'adresa', 'oras', 'cui', 'nrProd', 'actiuni'];
  constructor(public dialog: MatDialog,
              private httpService: HttpService) {}

  ngOnInit(): void {
      this.refreshProducatori();
  }

  addProducator() {
      console.log("Deschid dialog angajati gol");
      const dialogRef = this.dialog.open(ProducatoriDialogComponent, {
          width: '400px',
          height: '600px',
          maxWidth: '100%',
          maxHeight: '100%',
          disableClose: true,
      })
      dialogRef.afterClosed().subscribe(result => {
                  console.log('result: ' + result);
                  this.refreshProducatori();
                });
  }

  editProducator(producator: Producatori) {
      console.log("Deschid dialog producator populat cu id " + producator.id);
      const dialogRef = this.dialog.open(ProducatoriDialogComponent, {
          width: '400px',
          height: '600px',
          maxWidth: '100%',
          maxHeight: '100%',
          disableClose: true,
          data: {tip: "add", producator: producator}
      })
      dialogRef.afterClosed().subscribe(result => {
                  console.log('result: ' + result);
                  this.refreshProducatori();
                });
  }

  deleteProducator(producator: Producatori) {
    //   console.log("Sterg producator cu id " + producator.id);
    this.httpService.stergeProducator(producator).subscribe((response: any) => {
        console.log("Sters producator cu id " + producator.id);
        this.refreshProducatori();
    });
  }

  refreshProducatori() {
      this.httpService.citireProducatori().subscribe((producatori: Producatori[]) => {
          this.producatori = producatori;
      })
  }

}
