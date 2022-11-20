import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { combineLatestWith, forkJoin, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {
  constructor(private http:HttpClient){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.http.get<any>("http://localhost/elegance/api.php?mode=get_laptops").pipe(
      combineLatestWith(
        this.http.get<any>("http://localhost/elegance/api.php?mode=get_all_sales"),
        this.http.get<any>("http://localhost/elegance/api.php?mode=get_all_movement")))
  }
}
