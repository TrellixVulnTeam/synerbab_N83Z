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

  menuList: Array<any> = [];
  countList: Array<any> = [];
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
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const date = ('0' + newDate.getDate()).slice(-2);
    const hour = newDate.getHours();

    // 점심과 저녁을 맨 앞 1자리의 알파벳으로 구분한다.
    if (hour < 16) {
      this.today = 'L' + year + month + date;
    } else {
      this.today = 'D' + year + month + date;
    }
  }

  // counts 객체를 정렬하여 countList 배열에 저장하고 배열의 cnt값을 이용해 총 인원을 계산한다.
  setCountList() {
    this.countList = Object.entries(this.counts).sort();
    this.countList.map((cnt) => {
      this.totalPeople += cnt[1];
    })
  }


  // menu에서 각 행을 가져와 menuList 배열에 저장한다.
  getMenuList() {
    this.api.getApi('menu', this.today).subscribe(
      (success: Object) => {
        this.menuList = JSON.parse(JSON.stringify(success));
        this.menuList.forEach((item: any) => {
          this.counts[item.menu] = (this.counts[item.menu] || 0) + item.cnt;
          this.totalAmount += item.price * item.cnt;
        });
        this.setCountList();
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
  }


  // arrow-back-circle icon -> home page로 돌아간다.
  goBack(){
    this.navCtrl.back();
  }


  // checkmark-circle button -> state를 변경한다.
  onComplete(state) {
    setValue('state', state);
  }


}
