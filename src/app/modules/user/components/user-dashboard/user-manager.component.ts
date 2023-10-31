import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '@core/interface/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit, OnDestroy {
  private dataArray: User[] = [];
  private subs: Subscription = new Subscription();
  private userService: UserService = inject(UserService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'password', 'edit'];
  

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

  deleteUser(userID: string) {

    if(userID == 'admin@gmail.com' ) {
      this.launchError();
    } else {
      this.userService.deleteUser(userID).subscribe({
        next: () => {},
        error: (err: Error) => {
          console.error('Observer got an error: ' + err);
        },
        complete: () => this.onLoad(),
      })
    }
  }
  
  onLoad():void{
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.dataArray = users;
        this.dataSource = new MatTableDataSource<User>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: Error) => {
        console.error('Observer got an error: ' + err);
        this.dataSource = new MatTableDataSource<User>(this.dataArray);
      }
    })
  }
  

  launchError(): void {
    this._snackBar.open('¡No puedes eliminar al admin!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }

}