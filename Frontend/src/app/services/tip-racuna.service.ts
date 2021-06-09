import { tipRacuna } from 'src/app/models/tipRacuna';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TIP_RACUNA_URL } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class TipRacunaService {
  constructor(private httpClient: HttpClient) {}

  public getAllTipRacunas(): Observable<any> {
    return this.httpClient.get(`${TIP_RACUNA_URL}`);
  }

  public addTipRacuna(tipRacuna: tipRacuna): Observable<any> {
    tipRacuna.id = 0;
    return this.httpClient.post(`${TIP_RACUNA_URL}`, tipRacuna);
  }

  public updateTipRacuna(tipRacuna: tipRacuna): Observable<any> {
    return this.httpClient.put(`${TIP_RACUNA_URL}`, tipRacuna);
  }

  public deleteTipRacuna(id: number): Observable<any> {
    return this.httpClient.delete(`${TIP_RACUNA_URL}/${id}`);
  }
}
