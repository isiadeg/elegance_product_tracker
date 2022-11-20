import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { combineLatestWith, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TouseforcountService implements Resolve<any> {
  modelArray:any[]=[
    'Lenovo Thinkpad T450s',
    'HP EliteBook Folio 9470m',
    'Dell Latitude 3340',
    'Hp Revolve 810 G3',
  ]
  constructor(private http:HttpClient) { 
     }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return of(this.modelArray).pipe(
      tap(e=>console.log(e)),
      //combineLatestWith(
        
     // this.http.get("http://localhost/elegance/api.php?mode=get_touse_daily")
      //),
     
      )
  
  }
}
