import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

// const getValue = async (key) => {
//   const { value } = await Storage.get({ key: key });
//   return value;
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

  userName : string;

  async getValue(key:string): Promise<{value:any}> {
    return await Storage.get({ key: key });
  };

  goBack() {
    if (this.userName) {
      console.log(`${ this.userName }님 환영합니다!`);
      setValue('name', this.userName);
      console.log(this.getValue('name'))
    } else {
      console.log(`userName is null`);
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
