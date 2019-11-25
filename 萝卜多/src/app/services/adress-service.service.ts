import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdressServiceService {

  constructor() { }
  changeContentStatus(id: number, status: number): string { return `/a/u/article/status?id=${id}&status=${status}`}; 
}
