import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setTokenLocalStorage(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.userName);
    localStorage.setItem('type', data.type);
    localStorage.setItem('id', data.id);
  }
}
