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
export class ResultPage implements OnInit {

  userName: string;
  userMenu: string;
  count: string;
  price: string;

  constructor(private navCtrl: NavController) {

    this.getValue('name').then((data: any) => {
      this.userName = data.value;
    });

  }

  ngOnInit() {}

  async getValue(key:string): Promise<{value:any}> {
    return await Storage.get({ key: key });
  };

  goBack(){
    this.navCtrl.back();
  }

  onComplete() {
    setValue('state', '선택완료');
  }

}
