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

// const getValue = async (key) => {
//   return = await Storage.get({ key: key });
// };

const removeValue = async (key) => {
  await Storage.remove({ key: key });
};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController) {}
  ngOnInit() {}

  userName: string;

//   async setValue(key: string, value: string) {
//     return await Storage.set({ key: key, value: value });
//   };

  async getValue(key: string): Promise<{value: any}> {
    return await Storage.get({ key: key });
  };

  goBack() {
    if (this.userName) {
      alert(`${ this.userName }님 환영합니다!`);
      setValue('name', this.userName);
    } else {
      alert('이름을 입력해주세요.');
      return false;
    }
    this.navCtrl.back();
  }

  onChange(event) {
    this.userName = event.target.value;
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.goBack();
    }
  }

}
