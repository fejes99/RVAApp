import { tipRacuna } from 'src/app/models/tipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Racun } from 'src/app/models/racun';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css'],
})
export class RacunDialogComponent implements OnInit, OnDestroy {
  tipoviRacuna: tipRacuna[];
  public flag: number;
  tipRacunaSubscription: Subscription;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Racun,
    public racunService: RacunService,
    public tipRacunaService: TipRacunaService
  ) {}

  ngOnDestroy(): void {
    this.tipRacunaSubscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log('on init racun dialog component', this.data);
    (this.tipRacunaSubscription = this.tipRacunaService
      .getAllTipRacunas()
      .subscribe((tipoviRacuna) => {
        this.tipoviRacuna = tipoviRacuna;
      })),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      };
  }

  public compareTo(a, b) {
    return a === b;
  }

  public add(): void {
    this.racunService.addRacun(this.data).subscribe((data) => {
      this.snackBar.open('Uspesno dodat racun: ' + this.data.naziv, 'U redu', {
        duration: 2500,
      });
    }),
      (error: Error) => {
        console.log(error.name + '->' + error.message);
        this.snackBar.open('Doslo je do greske. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500,
        });
      };
  }

  public update(): void {
    this.racunService.updateRacun(this.data).subscribe((data) => {
      console.log('update from racun dialog data: ', this.data);
      this.snackBar.open(
        'Uspesno modifikovan racun: ' + this.data.naziv,
        'U redu',
        {
          duration: 2500,
        }
      );
    }),
      (error: Error) => {
        console.log(error.name + '->' + error.message);
        this.snackBar.open('Doslo je do greske. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500,
        });
      };
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id).subscribe((data) => {
      this.snackBar.open(
        'Uspesno obrisan racun: ' + this.data.naziv,
        'U redu',
        {
          duration: 2500,
        }
      );
    }),
      (error: Error) => {
        console.log(error.name + '->' + error.message);
        this.snackBar.open('Doslo je do greske. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500,
        });
      };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena', '', {
      duration: 100,
    });
  }
}
