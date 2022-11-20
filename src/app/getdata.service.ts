import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import {kkk} from "./results"


@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http:HttpClient) { }

  getdata():Observable<any>{
    return this.http.get<any>(`https://eventregistry.org/api/v1/article/getArticles?resultType=articles&sourceUri=edition.cnn.com&sourceUri=aljazeera.com&includeArticleImage=true&lang=eng&dateStart=2019-01-09&forceMaxDataTimeWindow=31&apiKey=11d54620-b419-4a77-b68a-5afeed779851`).pipe(
      map(e=>{
        console.log(e)
       return e.articles.results.map((each:any)=>{
       
        if(each['body']){
          console.log(each);
          return each['body'];
        }}) 
      }),
      catchError(err=>{
        console.log(err)
       return this.handleError(err)})
    )
  }


handleError(err:HttpErrorResponse):Observable<any>{
return throwError(err);
}

}