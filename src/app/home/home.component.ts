import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { extend } from "webdriver-js-extender";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { BlockScrollStrategy } from "@angular/cdk/overlay";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user = this.cookieService.get("role");
  constructor(
    private breakpointObserver: BreakpointObserver,
    private cookieService: CookieService,
    private route: Router
  ) {}

  role = this.cookieService.get("role");
  myStyles;
  ngOnInit() {
    // if(this.role == 'SUPER_ADMIN' || this.role == 'ADMIN' ){
    //   this.myStyles ={
    //     'display': 'block'
    //   }
    // }
    // else{
    //   this.myStyles ={
    //     'display': 'none'
    //   }
    // }
    if (this.cookieService.check("accessToken") == false) {
      this.route.navigate(["/login"]);
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  logout() {
    //this.cookieService.delete('accessToken')
    this.cookieService.deleteAll("/");
    this.route.navigate(["/login"]);
  }
}
