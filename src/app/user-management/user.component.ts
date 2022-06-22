import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { ServiceService } from '../service.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
apiUrl= environment.apiUrl;
accessToken;
users;
  constructor( private dialog:MatDialog,
              private serviceService: ServiceService,
              private cookService: CookieService,
              private toastService: ToastrService ) { }

  displayedColumns: string[] = ['no', 'firstName', 'lastName', 'emailAddress', 'role','phoneNumber', 'actions' ];
  dataSource = new MatTableDataSource<Users>(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
  
        this.accessToken = "bearer " + this.cookService.get("accessToken");
        const baseUrl = this.apiUrl + '/get-all-users'
        this.serviceService.getRequest( baseUrl, this.accessToken).subscribe(
          response => {
            if(response.success){
              console.log(response);
              this.dataSource.data = response.data;
              this.users = response.data;
              this.toastService.success('User Account', response.message);
            }
            else{
              this.toastService.info('User Account', response.message);
            }
          },
          error =>{
            this.toastService.error('Error Message', error.error.message);
          }
        );
     
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser(){
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      height: '550px',
      width: '400px'
    });
  }

  delete(countryName){
  
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      height: '200px',
      width: '700px',
    }) ;
    dialogRef.afterClosed().subscribe(result =>{
      if(result ==true){
        const baseUrl = this.apiUrl + '/country/'+ countryName;
      this.serviceService.deleteRequest(this.apiUrl, this.accessToken )
      .subscribe(
        response=>{
          console.log(response);
          this.toastService.success('User Info', response.message);
        },
        error=>{
          this.toastService.error('Error', error.error.message);
        }

      ); 
      }
     
    });
  }



}

export interface Users {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  role: string;
}
 //const ELEMENT_DATA: Users[] = this.users;
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];


