import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Country } from './country';
import { State } from './state';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countriesUrl = "https://xc-ajax-demo.herokuapp.com/api/countries/";

  constructor( 
    private http: HttpClient,
  ) { }
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl)
      .pipe(
        catchError(this.handleError('getCountries', [])));
  }
  getStates(code): Observable<State[]> {
    return this.http.get<State[]>(`${this.countriesUrl}${code}/states/`)
      .pipe(
        catchError(this.handleError('getCountries', [])));
  }
  addCountry(name: string, code: string, id: number): Observable<Country> {
    return this.http.post<Country>(this.countriesUrl, new Country(id, code, name) , httpOptions)
      .pipe(
        catchError(this.handleError<Country>('addCountry')));
  }
  addState(stateName: string, stateCode: string, countryCode: string, id: number) {
    return this.http.post<State>(`${this.countriesUrl}${countryCode}/states/`, new Country(id, stateCode, name), httpOptions).pipe(
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
