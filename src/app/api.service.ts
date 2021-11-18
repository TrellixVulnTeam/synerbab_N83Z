import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = 'https://api-dev.sngy.io/v1/study';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) {}

/*
  post(url: string, body: any, headers: any): Promise<HTTPResponse>
  get(url: string, parameters: any, headers: any): Promise<HTTPResponse>
  put(url: string, body: any, headers: any): Promise<HTTPResponse>
  delete(url: string, parameters: any, headers: any): Promise<HTTPResponse>
*/

  getApi(db, day) {
    if (db === 'badal') {
      return this.http.get(`${apiUrl}/${db}?grp=sky&day=${day}`);
    } else {
      return this.http.get(`${apiUrl}/${db}?day=${day}`);
    }
  }

  postApi(db, data) {
    return this.http.post(`${apiUrl}/${db}`, data);
  }

  putApi(db, id, data) {
    return this.http.put(`${apiUrl}/${db}/${id}`, data);
  }

//   deleteApi(db, id) {
//     return this.http.delete(`${apiUrl}/${db}/${id}`);
//   }

}
