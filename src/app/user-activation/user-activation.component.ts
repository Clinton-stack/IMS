import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {MatDialogModule, MatProgressSpinnerModule, MatIconModule, MatInputModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServiceService } from '../service.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {

apiUrl= environment.apiUrl;
activationCode;
hide = true;

  constructor(private formBuilder:FormBuilder,
              private route: ActivatedRoute,
              private serviceService: ServiceService,
              private cookService: CookieService,
              private toastService: ToastrService,
              private router: Router
              ) {
   }

  ngOnInit() {
    this.activationCode = this.route.snapshot.paramMap.get('activationcode');
    
    $(document).ready(function() {
      $("#passtext").keyup(function() {
        var x = document.getElementById('hint-id');
        var value = $(this).val()
        if(value == "") {
          x.style.display = 'none';
        } else {
          x.style.display = 'block';
        }
      });
    });

    $(document).ready(function() {
      $("#ptext").keyup(function() {
        var x = document.getElementById('hint-1');
        var value = $(this).val();
        if(value == "" || String(value).length < 6 ) {
          x.style.display = 'block';
        } else {
          x.style.display = 'none';
        }
      });
    });
  }


  submitform = this.formBuilder.group({
    verficationcode:[''],
    password: ['']

  });

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.cpassword.value;

  return pass === confirmPass ? null : { notSame: true }     
}
  
  form = this.formBuilder.group({
    password: ['',[Validators.required, Validators.minLength(6)]],
    cpassword: ['',[Validators.required, Validators.minLength(6)]],
  }, {validator: this.checkPasswords });


  submit(){
    this.submitform.patchValue({
      verficationcode: this.activationCode,
      password: this.form.controls.password.value
    })
    if(this.form.invalid){
      return
    }
    else{
      const baseUrl = this.apiUrl + '/'
      this.serviceService.loginRequest( baseUrl, this.submitform.value).subscribe(
        response => {
          if(response.success){
            console.log(response);
            this.toastService.success('User Account', response.message);
            this.router.navigate(['/login']);
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

}
