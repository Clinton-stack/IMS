import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import {
  MatTooltipModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule
} from "@angular/material";
import { MatListModule } from "@angular/material/list";
import { NgHttpLoaderModule } from "ng-http-loader";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ServiceService } from "./service.service";
import { CookieService } from "ngx-cookie-service";
// import * as PlotlyJS from "plotly.js/dist/plotly.js";
// import { PlotlyModule } from "angular-plotly.js";
import { ChartModule } from "primeng/chart";
import { Chart } from "chart.js";
// import { AgmCoreModule } from '@agm/core';
import { GMapModule } from "primeng/gmap";
// PlotlyModule.plotlyjs = PlotlyJS;

// For MDB Angular Pro
// import { SidenavModule, WavesModule, AccordionModule } from 'ng-uikit-pro-standard';
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { LayoutModule } from "@angular/cdk/layout";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user-management/user.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserActivationComponent } from "./user-activation/user-activation.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    HomeComponent,
    UserComponent,
    ConfirmationComponent,
    NotFoundComponent,
    DashboardComponent,
    UserActivationComponent
    // AgmCoreModule
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    NgHttpLoaderModule.forRoot(),
    MatFormFieldModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    // PlotlyModule,
    ChartModule,
    GMapModule
  ],
  entryComponents: [RegisterUserComponent, ConfirmationComponent],
  providers: [AppComponent, CookieService, ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
