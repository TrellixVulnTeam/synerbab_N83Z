import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  async getValue(key: string): Promise<{value: any}> {
    return await Storage.get({ key: key });
  };

  constructor(private router: Router, private api: ApiService) {
    this.isLogin();
  }

  // local storage에 userName이 있는지 확인해 로그인 여부를 판단한다.
  isLogin() {
    this.getValue('userName').then((data: any) => {
      !data.value ? this.router.navigate(['/login']) : this.router.navigate(['/']);
    });
  }
}
