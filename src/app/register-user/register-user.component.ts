import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ServiceService } from '../service.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  accessToken;
  apiUrl= environment.apiUrl;
  isError = false;
  users;
  role= this.cookService.get('role');
  deActivate = false;

  getusers(){
    if(this.role == "SUPER_ADMIN"){
      this.users = [
        {value: 'ADMIN'},
        {value: 'STORE_OFFICER'}]
    }
    else{
      this.users = [{value: 'STORE_OFFICER'},
                    {value: ''}]
    }

  }
 
 
  constructor(private dialog: MatDialogRef<RegisterUserComponent>,
              private fbuilder: FormBuilder,
              private serviceService: ServiceService,
              private cookService: CookieService,
              private toastService: ToastrService,
              private route:Router ) { }

  ngOnInit() {
    this.getusers()
  }

  regform = this.fbuilder.group({
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    phoneNumber:['', [Validators.required, Validators.minLength(10)]],
    emailAddress:['', [Validators.required, Validators.email]],
    role:['', [Validators.required]]
  });

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



  register() {
    if(this.regform.invalid){
      this.isError = true;
      return
    }
    else{
      this.accessToken = "bearer " + this.cookService.get("accessToken");
      const baseUrl = this.apiUrl
      this.serviceService.postRequest( baseUrl, this.regform.value, this.accessToken).subscribe(
        response => {
          if(response.success){
            console.log(response);
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
    }
    }

  close(){
    this.dialog.close();
  }
}
