import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RACUN_URL, RACUN_ZA_KLIJENTA_URL } from '../app.constants';
import { Racun } from '../models/racun';

@Injectable({
  providedIn: 'root',
})
export class RacunService {
  constructor(private httpClient: HttpClient) {}

  public getRacunForKlijent(id: number): Observable<any> {
    return this.httpClient.get(`${RACUN_ZA_KLIJENTA_URL}/${id}`);
  }

  public addRacun(racun: Racun): Observable<any> {
    racun.id = 0;
    return this.httpClient.post(`${RACUN_URL}`, racun);
  }

  public updateRacun(racun: Racun): Observable<any> {
    console.log('racun:: ', racun);
    console.log('radi');
    return this.httpClient.put(`${RACUN_URL}`, racun);
  }

  public deleteRacun(id: number): Observable<any> {
    return this.httpClient.delete(`${RACUN_URL}/${id}`);
  }
}
