import { KreditService } from './../../../services/kredit.service';
import { KlijentService } from './../../../services/klijent.service';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css'],
})
export class KlijentDialogComponent implements OnInit, OnDestroy {
  krediti: Kredit[];
  public flag: number;
  kreditSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KlijentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Klijent,
    public klijentService: KlijentService,
    public kreditService: KreditService
  ) {}

  ngOnDestroy(): void {
    this.kreditSubscription.unsubscribe();
  }

  ngOnInit(): void {
    (this.kreditSubscription = this.kreditService
      .getAllKredits()
      .subscribe((krediti) => {
        this.krediti = krediti;
      })),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      };
  }

  public add(): void {
    this.klijentService.addKlijent(this.data).subscribe((data) => {
      this.snackBar.open(
        'Uspesno dodat klijent: ' + this.data.ime + ' ' + this.data.prezime,
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
    this.klijentService.updateKlijent(this.data).subscribe((data) => {
      this.snackBar.open(
        'Uspesno modifikovan klijent: ' +
          this.data.ime +
          ' ' +
          this.data.prezime,
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
    this.klijentService.deleteKlijent(this.data.id).subscribe(() => {
      this.snackBar.open(
        'Uspesno obrisan klijent: ' + this.data.ime + ' ' + this.data.prezime,
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
