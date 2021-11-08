import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

const getValue = async (key) => {
  const { value } = await Storage.get({ key: key });
  return value;
};

const removeValue = async (key) => {
  await Storage.remove({ key: key });
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  isLogin: boolean = getValue('name') ? true : false;

  constructor(private router: Router) {
//     if (!isLogin) {
//       router.navigate(['/login']);
//     }
    this.init();
  }

  init(){
//     login name if else
    if (!this.isLogin) {
     this.router.navigate(['/login']);
    }
  }
}
