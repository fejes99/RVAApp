import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { tipRacuna } from 'src/app/models/tipRacuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css'],
})
export class TipRacunaComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<tipRacuna>;
  tipRacunaSubscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private tipRacunaService: TipRacunaService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.tipRacunaSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    (this.tipRacunaSubscription = this.tipRacunaService
      .getAllTipRacunas()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
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
    oznaka?: string
  ): void {
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {
      data: { id, naziv, opis, oznaka },
    });

    dialogRef.componentInstance.flag = flag;
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
