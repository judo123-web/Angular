import { Injectable } from '@angular/core';

export interface ApiDataType{
  success :boolean
  timestamp: number
  base: string
  date: string
  rates : {
      [propName: string]: number;
    }
}



@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }
}
