import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { CrudService } from './crud.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class InterseptorService implements HttpInterceptor{

  constructor(private cruds : UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(data=>{
        this.cruds.isspinner = true
        console.log("tap")
      }),

      finalize(()=>{
        setTimeout(() => {
          this.cruds.isspinner  = false
        }, 1000);
      })
    )
  }

}
