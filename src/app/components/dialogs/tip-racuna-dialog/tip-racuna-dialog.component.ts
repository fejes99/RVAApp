import { tipRacuna } from 'src/app/models/tipRacuna';
import { Component, Inject, OnInit } from '@angular/core';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css'],
})
export class TipRacunaDialogComponent implements OnInit {
  public flag: number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: tipRacuna,
    public tipRacunaService: TipRacunaService
  ) {}

  ngOnInit(): void {}

  public add(): void {
    this.tipRacunaService.addTipRacuna(this.data).subscribe((data) => {
      this.snackBar.open(
        'Uspesno dodat tip racuna: ' + this.data.naziv,
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

  public update(): void {
    this.tipRacunaService.updateTipRacuna(this.data).subscribe((data) => {
      this.snackBar.open(
        'Uspesno modifikovan tip racuna: ' + this.data.naziv,
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
    this.tipRacunaService.deleteTipRacuna(this.data.id).subscribe(() => {
      this.snackBar.open(
        'Uspesno obrisan tip racuna: ' + this.data.naziv,
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
