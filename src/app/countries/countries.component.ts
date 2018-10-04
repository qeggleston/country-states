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
  selectedCountry: Country;
  constructor(private countryService: CountryService) { }
  
  updateCountry(selected: Country): void {
    this.selectedCountry = selected;
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
      this.selectedCountry = this.countries[0];
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
    stateName = stateName.trim();
    console.log("adding a state!");
    if(!name) {
      console.log("no name.");
      return;
    }
    console.log("adding a state (actually)!");
    this.countryService.addState(stateName, stateCode, this.selectedCountry.id, this.selectedCountry.code).subscribe(() => {
      this.getStates(this.selectedCountry.code);
    });
  }
  
  //when a new country is selected from the dropdown, update the states dropdown
  getStates(code: string) {
    this.countryService.getStates(code).subscribe(states => this.states = states);
    
  }

  ngOnInit() {
    this.getCountriesAndReset();
    
  }

}
