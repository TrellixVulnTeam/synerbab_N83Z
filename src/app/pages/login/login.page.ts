import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../../api.service';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  // input이 있는지 확인하기 위해 이 페이지 내에서만 쓰일 변수
  userName: string;

  async getValue(key: string): Promise<{value: any}> {
    return await Storage.get({ key: key });
  };

  constructor(private navCtrl: NavController, private api: ApiService) {}

  // 입장하기 button -> userName이 있으면 home page로 이동하고 없으면 alert를 띄운다.
  goHome() {
    if (this.userName) {
      setValue('userName', this.userName);
      this.navCtrl.back();
    } else {
      alert('이름을 입력해주세요.');
      return false;
    }
  }

  // input의 입력값이 변경되면 userMenu의 값을 업데이트한다.
  onChange(event) {
    this.userName = event.target.value;
  }

  // 버튼을 직접 누르지 않아도 enter 키를 통해 입장할 수 있도록 한다.
  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.goHome();
    }
  }

}
