import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingInService {

  private env = environment.host;

  constructor(
    private http: HttpClient
  ) { }

  login(addr: string, data: any): Observable<any> {
    return this.http.post<any>(this.env + addr, data);
  }
}
