import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ApiService } from './api.service';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  async getValue(key:string): Promise<{value:any}> {
    return await Storage.get({ key: key });
  };

  async removeValue(key:string) {
    return await Storage.remove({ key: key });
  };

  isLogin: boolean = false;

  constructor(private router: Router, private api: ApiService) {
    this.init();

    this.api.getTest().subscribe(
         (success: any) => {
           console.log(`data: ${JSON.stringify(success)}`);
         },
         (err) => {
           console.log(`err : ${JSON.stringify(err)}`);
         }
       );
  }

  init(){
    this.getValue('name').then((data:any) => {
      if (data.value) {
//         this.router.navigate(['/']);
        console.log(data.value + '님 로그인 상태예요.');
      } else {
        this.router.navigate(['/login']);
      }
    });
    /* if (!this.isLogin) {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/']);
      console.log('로그인 상태예요.');
      console.log(this.getValue('name'));
    } */
  }
}
