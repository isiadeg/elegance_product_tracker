import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { GetdataService } from './getdata.service';

@Injectable({
  providedIn: 'root'
})
export class RetrieveResolver implements Resolve<any> {
  constructor(private getdata:GetdataService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.getdata.getdata().pipe(
      catchError(e=>{
        console.log(e instanceof HttpErrorResponse); 
        //let anothererror = e.statusText
        return of(e) as Observable<any>})
    )
  }
}
