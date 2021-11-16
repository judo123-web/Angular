import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDataType } from '../currency.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-currencies',
  templateUrl: './add-currencies.component.html',
  styleUrls: ['./add-currencies.component.scss']
})
export class AddCurrenciesComponent implements OnInit {
  currencynames: string[] = []
  currencyFrom!: FormGroup;
  rates : {[value : string] : number} = {}
  value : any = 0.00

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  apidata(): Observable<ApiDataType> {
    return this.http.get<ApiDataType>(`http://api.exchangeratesapi.io/v1/latest?access_key=f62641f8f5f1b93cb7a038ae7bfeeb32&format=1`)
  }

  get currencies() {
    return this.currencyFrom.get("currencies") as FormArray
  }

  addcurrencies() {
    this.currencies.push(
      this.fb.group({input: 0,select: "EUR"}),
    )
  }

  sumcurrencies(){
    var sum = 0
    for (let i of this.currencyFrom.get("currencies")?.value) {
      sum += i.input / this.rates[i.select]
    }
    this.value = (sum * this.rates[this.currencyFrom.value.resulselect]).toFixed(2)
  }

  delete(id : number) {
    this.currencies.removeAt(id)
    this.sumcurrencies()
  }

  changeselect() {
    this.apidata().subscribe(data => {
      this.rates = data.rates
      this.sumcurrencies()
    })
  }
  ngOnInit(): void {

    this.currencyFrom = this.fb.group({
      currencies: this.fb.array([
        this.fb.group({ input: 0, select: "EUR" }),
        this.fb.group({ input: 0, select: "EUR" }),
      ]),
      resultinput: [{value: this.value, disabled: true}, Validators.required],
      resulselect: ["EUR"]

    })



    this.apidata().subscribe(data => {
      this.rates = data.rates
      for (let i in data.rates) {
        this.currencynames.push(i)
      }
    })

  }

}
