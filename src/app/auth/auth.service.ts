import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private env = environment;

  constructor(
    private http: HttpClient
  ) { }

  loginMed(data: any) {
    return this.http.post<any>(this.env.host + 'auth', data, httpOptions);
  }
}
