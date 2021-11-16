import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../api.service';
import { Browser } from '@capacitor/browser';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

// const removeValue = async (key) => {
//   await Storage.remove({ key: key });
// };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  today: string;

  userName: string;
  url: string;
  menu: string;
  state: string;

  menuList: Array<string> = [];
  userMenu: string;
  count: number;
  price: number;

  async getValue(key: string): Promise<{value: any}> {
    return await Storage.get({ key: key });
  };

  constructor(private router: Router, public alertCtrl: AlertController, private api: ApiService) {

//     this.api.getMenuList('menu', '2021-11-16').subscribe(
//       (success: any) => {
//         console.log(JSON.parse(JSON.stringify(success))[0]);
//       },
//       (err) => {
//         console.log(JSON.stringify(err));
//       }
//     );
    this.setToday();
    this.setUserName();
  }

  // 오늘 날짜를 string 형태로 today에 저장해준다. ❗❕언제 리다이렉트 시킬지 ❕❗
  setToday() {
    const date = new Date();
    this.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  // local storage에서 userName을 불러와 저장해준다. (menuList에 저장하기 위함)
  setUserName() {
    this.getValue('userName').then((data: any) => {
      this.userName = data.value;
    });
  }

  // 해당 페이지로 라우팅시킨다.
  goResult() {
    this.router.navigate(['/result']);
  }
  goLogin() {
    this.router.navigate(['/login']);
  }
  // 입력된 url의 페이지로 이동하도록 한다. url이 입력되지 않았다면 alert를 띄운다.
  goLink() {
    console.log(this.url);
    this.url ? Browser.open({ url : this.url }) : alert('아직 링크가 입력되지 않았네요.');
  }

  // input의 입력값이 변경되면 userMenu의 값을 업데이트한다.
  onChange(event) {
    this.userMenu = event.target.value;
  }

  // 버튼을 직접 누르지 않아도 enter 키를 통해 입력을 완료할 수 있도록 한다.
  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.createUserMenu();
    }
  }

  // 새로고침을 했을 때 ❗❕️다른 곳에서 변경되었을 가능성이 있는 데이터들(menu, state, menuList)을 다시 불러온다.❕❗
  onRefresh(event) {
    console.log('Begin refreshing');
//     this.api.getMenuList('menu', this.today);

    setTimeout(() => {
      console.log('Finished refreshing');
      event.target.complete();
    }, 500);
  }

  // hammer icon -> menu 변경 팝업
  async updateMenuInfo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'updateMenuInfo',
      header: '오늘의 메뉴 변경하기',
      subHeader: '메뉴는 최대한 간단히 입력해주세요. (10글자)',
      inputs: [
        {
          id: 'url',
          name: 'url',
          value: this.url,
          placeholder: '링크를 입력해주세요.'
        },
        {
          id: 'menu',
          name: 'menu',
          type: 'text',
          value: this.menu,
          placeholder: '상단에 표시할 메뉴를 입력해주세요.'
        }
      ],
      buttons: [
        {
          text: '취소하기',
          cssClass: 'cancel',
          handler: () => {
            console.log('메뉴 정보 변경을 취소했어요.');
          }
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: (data) => {
            !data.url ? this.url = '' : this.url = data.url;
            setValue('url', this.url);

            !data.menu ? this.menu = '' : this.menu = data.menu;
            setValue('menu', this.menu);

            console.log('메뉴 정보가 정상적으로 변경되었어요.');
          }
        }
      ]
    });
    await alert.present().then(result => {
      document.getElementById('menu').setAttribute('maxLength', '10');
    });
  }

  // paper-plane icon -> userMenu 입력 팝업
  async createUserMenu() {
    const alert = await this.alertCtrl.create({
      cssClass: 'createUserMenu',
      header: '내 메뉴 입력하기',
      subHeader: '1인분이라면 수량은 생략하셔도 좋아요.',
      inputs: [
        {
          id: 'count',
          name: 'count',
          type: 'number',
          placeholder: '수량을 입력해주세요.'
        },
        {
          id: 'price',
          name: 'price',
          type: 'number',
          placeholder: '가격을 입력해주세요.'
        }
      ],
      buttons: [
        {
          text: '취소하기',
          cssClass: 'cancel',
          handler: () => {
            console.log('내 메뉴 등록을 취소했어요.');
          }
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: (data) => {
            if (!data.count) {
              this.count = 1;
            } else {
              this.count = data.count;
            }
            setValue('count', this.count);

            if (!data.price) {
              console.log('가격은 필수 항목이에요.');
              this.price = null;
              return false;
            } else {
              this.price = data.price;
            }
            setValue('price', this.price);

            this.menuList[0] = this.userMenu;
          }
        }
      ]
    });
    await alert.present();
  }

  // pencil icon -> userMenu 변경 팝업
  async updateUserMenu() {
    const alert = await this.alertCtrl.create({
      cssClass: 'updateUserMenu',
      header: '내 메뉴 변경하기',
      subHeader: '변경할 메뉴의 정보를 입력해주세요.',
      inputs: [
        {
          id: 'userMenu',
          name: 'userMenu',
          type: 'text',
          value: this.userMenu,
          placeholder: '메뉴명을 입력해주세요.'
        },
        {
          id: 'count',
          name: 'count',
          type: 'number',
          value: this.count,
          placeholder: '수량을 입력해주세요.'
        },
        {
          id: 'price',
          name: 'price',
          type: 'number',
          value: this.price,
          placeholder: '가격을 입력해주세요.'
        }
      ],
      buttons: [
        {
          text: '취소하기',
          cssClass: 'cancel',
          handler: () => {
            console.log('내 메뉴 변경을 취소했어요.');
          }
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: (data) => {
            if (!data.userMenu) {
              console.log('메뉴명은 필수 항목이에요.');
              this.userMenu = '';
              return false;
            } else {
              this.userMenu = data.userMenu;
            }
            setValue('userMenu', this.userMenu);

            if (!data.count) {
              this.count = 1;
            } else {
              this.count = data.count;
            }
            setValue('count', this.count);

            if (!data.price) {
              console.log('가격은 필수 항목이에요.');
              this.price = null;
              return false;
            } else {
              this.price = data.price;
            }
            setValue('price', this.price);

            this.menuList[0] = this.userMenu;
          }
        }
      ]
    });
    await alert.present();
  }
}
