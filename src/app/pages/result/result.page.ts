import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage {

  menuList: Array<string> = [];

  async getValue(key:string): Promise<{value:any}> {
    return await Storage.get({ key: key });
  };

  constructor(private navCtrl: NavController) {}

  // arrow-back-circle icon -> home page로 돌아간다.
  goBack(){
    this.navCtrl.back();
  }

  // checkmark-circle button -> state를 변경한다.
  onComplete(state) {
    setValue('state', state);
  }

}
