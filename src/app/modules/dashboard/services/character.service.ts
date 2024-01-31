import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl: string = `https://rickandmortyapi.com/api/`;

  constructor(private httpClient: HttpClient) { }

  getCharacters(page: any = `${this.baseUrl}character`): Observable<any> {
    console.log(page);
    return this.httpClient.get(
      page,
      { responseType: 'json' }
    );
  }

  searchCharacter(name: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}character/?name=${name}`, 
      { responseType: 'json' }
    );
  }
}
