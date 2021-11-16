import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDataType } from '../currency.service';

@Component({
  selector: 'app-currencyexchange',
  templateUrl: './currencyexchange.component.html',
  styleUrls: ['./currencyexchange.component.scss']
})
export class CurrencyexchangeComponent implements OnInit {

  currencynames: string[]


  inp1value: any
  inp2value: any
  select1value: string
  select2value: string
  equivalent : any


  select1ratetoeur: any
  select2ratetoeur: any


  constructor(private http: HttpClient) {
    this.currencynames = []

    this.inp1value = 1
    this.inp2value = 1
    this.select1value = "EUR"
    this.select2value = "EUR"

    this.select1ratetoeur = 1
    this.select2ratetoeur = 1
    this.equivalent = 1
  }

  apidata(): Observable<ApiDataType> {
    return this.http.get<ApiDataType>(`http://api.exchangeratesapi.io/v1/latest?access_key=f62641f8f5f1b93cb7a038ae7bfeeb32&format=1`)
  }

  inputone(event: any) {
    this.inp1value = event.target.value
    this.inp2value = ((this.inp1value / this.select1ratetoeur) * this.select2ratetoeur).toFixed(2)
  }

  inputtwo(event: any) {
    this.inp2value = event.target.value
    this.inp1value = ((this.inp2value / this.select2ratetoeur) * this.select1ratetoeur).toFixed(2)
  }

  selectone(event: any) {
    this.select1value = event.target.value
    this.apidata().subscribe(data => {
      this.select1ratetoeur = data.rates[this.select1value]
      this.equivalent = (1 / data.rates[this.select1value]) * data.rates[this.select2value]
      this.inp2value = ((this.inp1value / data.rates[this.select1value]) * data.rates[this.select2value]).toFixed(2)

    })
  }

  selecttwo(event: any) {
    this.select2value = event.target.value
    this.apidata().subscribe(data => {
      this.select2ratetoeur = data.rates[this.select2value]
      this.equivalent = (1 / data.rates[this.select1value]) * data.rates[this.select2value]
      this.inp2value = ((this.inp1value / data.rates[this.select1value]) * data.rates[this.select2value]).toFixed(2)

    })
  }





  ngOnInit(): void {
    this.apidata().subscribe(data => {
      for (let i in data.rates) {
        this.currencynames.push(i)
      }
    })

  }

}
