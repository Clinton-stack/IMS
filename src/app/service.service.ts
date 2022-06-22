import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService{
  constructor( private http: HttpClient,
               private router: Router,
               private cookieService: CookieService) { }

isLoggedin(){
  return !!this.getToken();
}

getToken(){
  return this.cookieService.get("access_token")
}

loginRequest(url: string, data: any): any {
                console.log(data);
                const httpOptions = {
                  headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                  })
                };
                return this.http.post(url, data, httpOptions).
                pipe(
                  catchError(this.handleError),
                );
                
              }


  postRequest(url: string, data: any, accessToken): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: accessToken
      })
    };
    return this.http.post(url, data, httpOptions).
    pipe(
      catchError(this.handleError),
    );
  }
  putRequest(url: string, data: any, accessToken): any  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: accessToken
      })
    };
    return this.http.put(url, data, httpOptions).
    pipe(
      catchError(this.handleError),
      
    );
  }
  getRequest(url: string, accessToken): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: accessToken
      })
    };
    return this.http.get(url, httpOptions).
    pipe(
      catchError(this.handleError),
      // this.toastr.error('Something went wrong, Please try gain', 'Error')
    );
  }

  deleteRequest(url: string, accessToken): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: accessToken
      })
    };
    return this.http.delete(url, httpOptions).
    pipe(
      catchError(this.handleError),
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        // alert(error.error.message),
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
        );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}