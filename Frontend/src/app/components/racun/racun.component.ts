import { tipRacuna } from 'src/app/models/tipRacuna';
import { Klijent } from 'src/app/models/klijent';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css'],
})
export class RacunComponent implements OnInit, OnDestroy, OnChanges {
  displayedColumns = [
    'id',
    'naziv',
    'opis',
    'oznaka',
    'klijent',
    'tipRacuna',
    'actions',
  ];
  dataSource: MatTableDataSource<Racun>;
  subscription: Subscription;

  @Input() selektovanKlijent: Klijent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private racunService: RacunService, public dialog: MatDialog) {}

  ngOnChanges(): void {
    if (this.selektovanKlijent) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log(`selektovan klijent ${this.selektovanKlijent}`);
  }

  public loadData() {
    console.log('selektovan klijent u loadData:: ', this.selektovanKlijent);
    (this.subscription = this.racunService
      .getRacunForKlijent(this.selektovanKlijent.id)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);

        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'tipRacuna'
              ? currentTerm + data.tipRacuna.naziv
              : currentTerm + data[key];
          };
          const dataStr = Object.keys(data)
            .reduce(accumulator, '')
            .toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'tipRacuna':
              return data.tipRacuna.naziv.toLocaleLowerCase();
            default:
              return data[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      };
  }

  public openDialog(
    flag: number,
    id?: number,
    naziv?: string,
    opis?: string,
    oznaka?: string,
    klijent?: Klijent,
    tipRacuna?: tipRacuna
  ): void {
    const dialogRef = this.dialog.open(RacunDialogComponent, {
      data: { id, naziv, opis, oznaka, klijent, tipRacuna },
    });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1) {
      dialogRef.componentInstance.data.klijent = this.selektovanKlijent;
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
