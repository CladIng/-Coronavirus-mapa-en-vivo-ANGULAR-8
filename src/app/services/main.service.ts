import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl: string = 'https://fast-scrubland-93500.herokuapp.com'

  constructor(
    private _http: HttpClient
  ) { }

  listaDeContagios(): Observable <any> {
    return this._http.get(this.baseUrl+'/contagios');
  }

}
