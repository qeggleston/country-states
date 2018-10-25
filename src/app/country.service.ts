import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Country } from './country';
import { State } from './state';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countriesUrl = "http://localhost:8000/countries/";

  constructor( 
    private http: HttpClient,
  ) { }
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl)
      .pipe(
        catchError(this.handleError('getCountries', [])));
  }
  getStates(country: string): Observable<State[]> {
    return this.http.get<State[]>(`${this.countriesUrl}${country}/states/`)
      .pipe(
        catchError(this.handleError('getCountries', [])));
  }
  addCountry(countryName: string, countryCode: string): Observable<Country> {
    let country = {
      code: countryCode, 
      name: countryName
    }
    console.log(country);
    console.log(this.countriesUrl);
    console.log(httpOptions);
    return this.http.post<Country>(this.countriesUrl, country, httpOptions)
      .pipe(
        catchError(this.handleError<Country>('addCountry')));
  }
  addState(stateName: string, stateCode: string, countryCode: string) {
    let state = {
      code: stateCode, 
      name: stateName,
      //country: countryId,
    }
    return this.http.post<State>(`${this.countriesUrl}${countryCode}/states/`, state, httpOptions).pipe(
      catchError(this.handleError<State>('addState')));
    
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);  
      //this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 

}
