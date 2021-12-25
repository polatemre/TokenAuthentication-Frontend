import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { User } from './models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit, OnInit {

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// displayedColumns: string[] = ["id","email","fullName","status","passwordChange","updateClaim","updateGroupClaim","update","delete"];
	displayedColumns: string[] = ["id","email","fullName","status"];

  userList: User[];
  dropdownSettings: IDropdownSettings;

  constructor(private userService: UserService,) { }

  ngAfterViewInit(): void {
    this.getUserList();
  }

  ngOnInit(): void {
    this.dropdownSettings = environment.getDropDownSetting;
  }

  getUserList() {
    this.userService.getUserList().subscribe(data => {
      this.userList = data;
      this.dataSource = new MatTableDataSource(data);
			this.configDataTable();
    });
  }

  configDataTable(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

  applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
