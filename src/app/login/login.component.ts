import { Component, OnInit } from "@angular/core";
import { Spinkit } from "ng-http-loader";
import {
  MatDialogModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { ServiceService } from "../service.service";
import { FormBuilder, Validators } from "@angular/forms";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  apiUrl = environment.apiUrl;
  constructor(
    private cookService: CookieService,
    private toastService: ToastrService,
    private route: Router,
    private serviceService: ServiceService,
    private formbuilder: FormBuilder
  ) {}

  displaybox = true;
  hideBox = false;
  ngOnInit() {
    if (this.cookService.check("accessToken") == true) {
      this.route.navigate(["/home"]);
    }
  }

  show() {
    this.displaybox = false;
    this.hideBox = true;
  }

  hide() {
    this.displaybox = true;
    this.hideBox = false;
  }

  loginform = this.formbuilder.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  resetForm = this.formbuilder.group({
    emailAddress: ["", [Validators.required, Validators.email]]
  });

  login() {
    if (this.loginform.invalid) {
      return;
    } else {
      const baseUrl = this.apiUrl + "/login";
      this.serviceService.loginRequest(baseUrl, this.loginform.value).subscribe(
        response => {
          if (response.success) {
            console.log(response);
            this.toastService.success("User Account", response.message);
            this.cookService.set("accessToken", response.data.access_token);
            this.cookService.set("firstname", response.data.user.firstName);
            this.cookService.set("role", response.data.user.role.name);
            this.route.navigate(["/home"]);
          } else {
            this.toastService.info("User Account", response.message);
          }
        },
        error => {
          this.toastService.error("Error Message", error.error.message);
        }
      );
    }
  }

  reset() {
    if (this.resetForm.invalid) {
      return;
    } else {
      const baseUrl = this.apiUrl + "/password/recovery";
      this.serviceService.loginRequest(baseUrl, this.resetForm.value).subscribe(
        response => {
          if (response.success) {
            console.log(response);
            this.toastService.success("User Account", response.message);
            this.route.navigate(["/login"]);
          } else {
            this.toastService.info("User Account", response.message);
          }
        },
        error => {
          this.toastService.error("Error Message", error.error.message);
        }
      );
    }
  }
}
