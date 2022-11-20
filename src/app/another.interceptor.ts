import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class AnotherInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      

      tap(e=>{
        console.log(request); console.log(HttpEventType);
        if(e.type === HttpEventType.Response){
          console.log(`insatnce of response`);
        }
      })
    );
  }
}
