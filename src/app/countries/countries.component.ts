import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { State } from '../state';
import { CountryService } from '../country.service';

@Component({
  
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  //hold currently selected country and state objects
  countries: Country[];
  states: State[];
  selectedCode: string;
  constructor(private countryService: CountryService) { }
  
  
  getCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
     });
    
  }

  getCountriesAndReset(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.getStates(this.countries[0].code);
     });
  }
  
  addCountry(name: string, code: string): void {
    name = name.trim();
    if(!name) { return; }
    this.countryService.addCountry(name, code, this.countries.length).subscribe(() => {
      this.getCountries();
    });
  }

  addState(stateName: string, stateCode: string, countryCode: string) {
    stateName = stateName.trim();
    if(!name) {
      return;
    }
    this.countryService.addState(stateName, stateCode, countryCode, this.states.length).subscribe(() => {
      this.getStates(countryCode);
    });
  }
  
  //when a new country is selected from the dropdown, update the states dropdown
  getStates(code) {
    this.countryService.getStates(code).subscribe(states => this.states = states);
  }

  ngOnInit() {
    this.getCountriesAndReset();
    
  }

}
