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
  selectedCountry: string;
  constructor(private countryService: CountryService) { }
  
  updateCountry(selected: string): void {
    this.selectedCountry = selected;
    this.getStates(selected);
    console.log(selected);
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
     });
    
  }

  getCountriesAndReset(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.getStates(this.countries[0].code);
      this.selectedCountry = this.countries[0].code;
     });
  }
  
  addCountry(name: string, code: string): void {
    name = name.trim();
    if(!name) { return; }
    this.countryService.addCountry(name, code).subscribe(() => {
      this.getCountries();
    });
  }

  addState(stateName: string, stateCode: string): void {
    console.log(this.selectedCountry);
    if(!stateName) {
      return;
    }
    this.countryService.addState(stateName, stateCode, this.selectedCountry).subscribe(() => {
      this.getStates(this.selectedCountry);
    });
  }
  
  //when a new country is selected from the dropdown, update the states dropdown
  getStates(code: string) {
    this.countryService.getStates(code).subscribe(states => this.states = states);
    for(let x = 0; x < this.countries.length; x++) {
      if(code === this.countries[x].code) {
        this.selectedCountry = this.countries[x].code;
      }    
    }
    
  }

  ngOnInit() {
    this.getCountriesAndReset();
    
  }

}
