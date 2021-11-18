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
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage {

  menuList: Array<string> = [];
  countList: Array<string> = [];
  counts: Object = {};
  today: string;
  menu: string;

  totalAmount: number = 0;
  totalPeople: number = 0;

  async getValue(key:string): Promise<{value:any}> {
    return await Storage.get({ key: key });
  };


  constructor(private navCtrl: NavController, private api: ApiService) {
    this.setToday();
    this.getMenuList();
  }


  // 오늘 날짜를 string 형태로 today에 저장해준다.
  setToday() {
    const date = new Date();
    this.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  setCountList() {
//     console.log(this.countList, this.counts); // ❗❕menu와 각각의 count를 담는 배열을 만드는 방법❕❗
  }

  // menu에서 각 행을 가져와 menuList 배열에 저장한다.
  getMenuList() {
    this.api.getApi('menu', this.today).subscribe(
      (success: Object) => {
        this.menuList = JSON.parse(JSON.stringify(success));
        this.menuList.map((item: any) => {
          if (item.menu.length >= 9) {
            item.menu = item.menu.slice(0, 9) + '…';
          }
          this.totalAmount += item.price;
          this.totalPeople += 1;
          this.counts[item.menu] = (this.counts[item.menu] || 0) + 1;
        })
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
    this.setCountList();
  }


  // arrow-back-circle icon -> home page로 돌아간다.
  goBack(){
    this.navCtrl.back();
//     location.reload();
  }


  // checkmark-circle button -> state를 변경한다.
  onComplete(state) {
    setValue('state', state);
  }


}
