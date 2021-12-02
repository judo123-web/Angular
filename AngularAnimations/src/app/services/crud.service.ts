import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

    constructor(private http : HttpClient) {}

    createEmploye(employee_data : any) {
      return this.http.post<any>(`http://localhost:3000/employees`,employee_data)
      .pipe(map(data => data))
    }
  
    getEmployes() {
      return this.http.get<any>("http://localhost:3000/employees")
      .pipe(map(data => data))
    }
  
    updateEmploye(employee_data : any, id : number) {
      return this.http.put<any>(`http://localhost:3000/employees/${id}`,employee_data)
      .pipe(map(data => data))
    }
  
    deleteEmploye(id : number) {
      return this.http.delete<any>(`http://localhost:3000/employees/${id}`)
      .pipe(map(data => data))
    }
   
}
