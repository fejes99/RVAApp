import { KlijentDialogComponent } from './../dialogs/klijent-dialog/klijent-dialog.component';
import { Kredit } from './../../models/kredit';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KlijentService } from 'src/app/services/klijent.service';
import { Klijent } from 'src/app/models/klijent';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css'],
})
export class KlijentComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'ime', 'prezime', 'kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  klijentSubscription: Subscription;

  selektovanKlijent: Klijent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private klijentService: KlijentService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.klijentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    (this.klijentSubscription = this.klijentService
      .getAllKlijents()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);

        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'kredit'
              ? currentTerm + data.kredit.naziv
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
            case 'kredit':
              return data.kredit.naziv.toLocaleLowerCase();
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
    ime?: string,
    prezime?: string,
    kredit?: Kredit
  ): void {
    const dialogRef = this.dialog.open(KlijentDialogComponent, {
      data: { id, ime, prezime, kredit },
    });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  selectRow(row: any) {
    console.log(row);
    this.selektovanKlijent = row;
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
