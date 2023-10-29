import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Price } from '../price/interface/price';
import { PriceService } from './service/price.service';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-precio',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PriceComponent implements OnInit, OnDestroy {
  dataArray: Price[] = [];
  private subs: Subscription = new Subscription();
  cryptoService: PriceService = inject(PriceService);

  displayedColumns: string[] = [
    'market_cap_rank',
    'name',
    'current_price',
    'high_24h',
    'low_24h',
  ];
  dataSource!: MatTableDataSource<Price>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.onLoad();  
  }

  ngAfterViewInit() {
    try {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch {}
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onLoad(): void {
    this.subs.add(

      // TODO: en caso de bloqueo, cambie el método getCryptocurrencies()
      // this.cryptoService.getCryptocurrencies().subscribe({

      this.cryptoService.getListCriptoPrice().subscribe({
        next: (prices: Price[]) => {
          this.dataArray = prices;
          this.dataSource = new MatTableDataSource<Price>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err: Error) => {
          console.error('Observer got an error: ' + err);
          this.dataSource = new MatTableDataSource<Price>(this.dataArray);
        },
      })

    );
  }
}
