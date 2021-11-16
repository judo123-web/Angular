import { Component } from '@angular/core';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularCurrencyExchange';

  constructor(private service : CurrencyService) {}
  
  whichpage : "converter" | "sumcurrencies" = "converter"

}
