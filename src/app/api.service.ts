import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = 'http://api-dev.sngy.io/v1/study';
const apiHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})

export class ApiService {



  constructor(private http: HttpClient) {}

//     post(url: string, body: any, headers: any): Promise<HTTPResponse>
//     get(url: string, parameters: any, headers: any): Promise<HTTPResponse>
//     put(url: string, body: any, headers: any): Promise<HTTPResponse>
//     delete(url: string, parameters: any, headers: any): Promise<HTTPResponse>

//   createApi(db, data) {
//     this.http.post(`${apiUrl}/${db}`, { data }, { apiHeaders })
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
//   }
  getTest(){
    return this.http.get('http://api-dev.sngy.io/v1/study/menu?day=2021-11-12');
  }

  getMenuList(db, day) {
      this.http.get(`${apiUrl}/${db}?day=${day}`).subscribe(data => {
        console.log("here : ",data);
      }, err => {
        console.log(err);
      });
    }

  readApi(db, day) {
    if (db === 'badal') {
      this.http
      .get(`${apiUrl}/${db}?grp=sky&day=${day}`, {})
//       .then(data => console.log(data))
      .pipe(
//         tab(_ => this.),
//         catchError(this.handleError('readApi', data))
      );
    }
//     else {
//       this.http
//       .get(`${apiUrl}/${db}?day=${day}`, {}, { apiHeaders })
//       .then(data => console.log(data))
//       .catch(error => console.log(error));
//     }
  }

//   updateApi(db, id) {
//     this.http
//     .put(`${apiUrl}/${db}/${id}`, {}, { apiHeaders })
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
//   }
//
//   deleteApi(db, id) {
//     this.http
//     .delete(`${apiUrl}/${db}/${id}`, {}, { apiHeaders })
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
//   }

}
