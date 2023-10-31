import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Price } from '../../../../core/interface/price';
import { PriceService } from './service/price.service';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/interface/user';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-precio',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PriceComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private cryptoService: PriceService = inject(PriceService);
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  dataArray: Price[] = [];
  currentUser: User = new User();

  displayedColumns: string[] = [
    'market_cap_rank',
    'name',
    'current_price',
    'high_24h',
    'low_24h',
    'favorites',
  ];
  dataSource!: MatTableDataSource<Price>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.onLoad();
    this.subs.add(
      this.authService
        .getUser()
        .subscribe({
          next: (user: User) => (this.currentUser = user ?? new User()),
          error: (err: any) => console.log(err),
        })
    );
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
      // en caso de bloqueo, cambie el método getListCriptoPrice() por getCryptocurrencies()

      // this.cryptoService.getListCriptoPrice().subscribe({
      this.cryptoService.getCryptocurrencies().subscribe({
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

  addToFav(name: string): void {
    if(this.currentUser.favoritesCryptosName.includes(name)) 
      this.currentUser.favoritesCryptosName = this.currentUser.favoritesCryptosName.filter(item => item !== name);
    else 
    this.currentUser.favoritesCryptosName.push(name);

    this.userService.updateUser(this.currentUser).subscribe({error: (err: any) => console.log(err)})
  }
}
