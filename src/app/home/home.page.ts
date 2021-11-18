import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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

  infoId: any;
  userId: any;
  userName: string;

  url: string;
  menu: string;
  state: string;

  menuList: any[];
  userMenu: string;
  count: number;
  price: number;


  async getValue(key: string): Promise<{value: any}> {
    return await Storage.get({ key: key });
  };


  constructor(private router: Router, private alertCtrl: AlertController, private toastCtrl: ToastController, private api: ApiService) {
    this.resetEveryValue();
    this.setToday();
    this.setUserName();
    this.getMenuList();
//     this.setMenuInfo(); // ❗❕새로고침할 때마다 다시 세팅돼서...❕❗
    this.getMenuInfo();
  }

  resetEveryValue() {
    this.infoId = '163';
    setValue('infoId', '163');
    this.userId = '';
    setValue('userId', '');
    this.url = '';
    setValue('url', '');
    this.menu = '';
    setValue('menu', '');
    this.state = '';
    setValue('state', '');
    this.userMenu = '';
    setValue('userMenu', '');
    this.count = null;
    setValue('count', null);
    this.price = null;
    setValue('price', null);
  }

  // 오늘 날짜를 string 형태로 today에 저장해준다. ❗❕언제 리다이렉트 시킬지❕❗
  setToday() {
    const date = new Date();
    this.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  // local storage에서 userName을 불러와 저장해준다. (메뉴를 입력할 때 menuList에 저장하기 위함 -> 한 번만 실행해주면 충분)
  setUserName() {
    this.getValue('userName').then((data: any) => {
      this.userName = data.value;
    });
  }
  // getApi를 사용하여 값을 받아오고 나서 값이 local storage에 저장이 안돼서 다시 한 번 저장해준다.
  setInfoValue() {
    this.getValue('url').then((data: any) => {
      data.value && (this.url = data.value);
    });
    this.getValue('menu').then((data: any) => {
      data.value && (this.menu = data.value);
    });
    this.getValue('state').then((data: any) => {
      data.value && (this.state = data.value);
    });
  }
  setListValue() {
    this.getValue('userId').then((data: any) => {
      data.value ? (this.userId = data.value) : (this.userId = '');
    });
    this.getValue('userMenu').then((data: any) => {
      data.value ? (this.userMenu = data.value) : (this.userMenu = '');
    });
    this.getValue('count').then((data: any) => {
      data.value ? (this.count = data.value) : (this.count = null);
    });
    this.getValue('price').then((data: any) => {
      data.value ? (this.price = data.value) : (this.price = null);
    });
  }
  // 아무것도 없는 상태에서 put을 하면 오류가 나기 때문에 빈 값으로 만들어 준다. (처음 한 번만 실행)
  setMenuInfo() {
    if (true) return false;
    this.api.postApi('badal',
      {
          "day": this.today,
          "grp": "sky",
          "name": "",
          "url": "",
          "menu": "",
          "etc" : ""
      }
    ).subscribe(
      (success: Object) => {
        this.infoId = JSON.stringify(success);
        setValue('infoId', this.infoId);
        console.log('this.infoId', this.infoId);
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
    this.getMenuInfo();
  }


  // badal에서 url, menu, etc를 가져온다.
  getMenuInfo() {
    this.api.getApi('badal', this.today).subscribe(
      (success: Object) => {
        if (success == '') return false;
        this.url = success[0].url;
        setValue('url', this.url);
        this.menu = success[0].menu;
        setValue('menu', this.menu);
        this.state = success[0].etc;
        setValue('state', this.state);
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
    this.setInfoValue();
  }

  // menu에서 각 행을 가져와 menuList 배열에 저장한다.
  getMenuList() {
    this.api.getApi('menu', this.today).subscribe(
      (success: Object) => {
        if (success == '') return false;
        this.menuList = JSON.parse(JSON.stringify(success));
        this.menuList.map((item: any) => {
          if (item.name === this.userName) {
            this.userId = item.id;
            setValue('userId', this.userId);
            this.userMenu = item.menu;
            setValue('userMenu', this.userMenu);
            this.count = item.cnt;
            setValue('count', this.count);
            this.price = item.price;
            setValue('price', this.price);
          }
        })
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
    this.setListValue();
  }

  // badal에 입력된 url, menu, state(etc)를 저장한다.
//   postMenuInfo() {
//     this.api.postApi('badal',
//       {
//         "day": this.today,
//         "grp": "sky",
//         "name": this.userName,
//         "url": this.url,
//         "menu": this.menu,
//         "etc": this.state
//       }
//     ).subscribe(
//       (success: Object) => {
//         console.log(JSON.stringify(success));
//       },
//       (err: Object) => {
//         console.log(JSON.stringify(err));
//       }
//     );
//     this.getMenuInfo();
//   }
  // menu에 입력된 userMenu, count, price를 저장한다.
  postMenuList() {
    this.api.postApi('menu',
      {
        "day": this.today,
        "name": this.userName,
        "menu": this.userMenu,
        "cnt": this.count,
        "price": this.price
      }
    ).subscribe(
      (success: Object) => {
        console.log(JSON.stringify(success));
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
    this.getMenuList();
  }

  // badal에서 변경된 url, menu, state(etc)를 저장한다. ❗❕이걸로만 계속 업데이트하면 postMenuInfo는 불필요❕❗
  putMenuInfo() {
    this.api.putApi('badal', this.infoId,
      {
        "name": this.userName,
        "url": this.url,
        "menu": this.menu,
        "etc": this.state
      }
    ).subscribe(
      (success: Object) => {
        console.log(JSON.stringify(success));
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
    this.getMenuInfo();
  }
  // menu에서 변경된 userMenu, count, price를 저장한다.
  putMenuList() {
    this.api.putApi('menu', this.userId,
      {
        "menu": this.userMenu,
        "cnt": this.count,
        "price": this.price
      }
    ).subscribe(
      (success: Object) => {
        console.log(JSON.stringify(success));
      },
      (err: Object) => {
        console.log(JSON.stringify(err));
      }
    );
    this.getMenuList();
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
  // 새로고침을 했을 때 ❗❕️다른 곳에서 변경되었을 가능성이 있는 데이터들(url, menu, state, menuList)을 다시 불러온다.❕❗
  onRefresh(event) {
    this.getMenuInfo();
    this.getMenuList();

    setTimeout(() => {
      event.target.complete();
//       location.reload(); // ❗❕이게 맞을까..❕❗
    }, 500);
  }


  // hammer icon -> menu 설정 팝업
  async updateMenuInfo() {
    if (this.state == ('선택완료' || '주문완료')) return false;
    const alert = await this.alertCtrl.create({
      cssClass: 'updateMenuInfo',
      header: '오늘의 메뉴 설정하기',
      subHeader: '메뉴는 되도록 간단하게 입력해주세요.',
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
          handler: () => {}
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: (data) => {
            if (data.url) {
              this.url = data.url;
              setValue('url', this.url);
            }
            if (data.menu) {
              this.menu = data.menu;
              setValue('menu', this.menu);
            }

            this.state = '선택중';
            setValue('state', this.state);
            this.noticeToast('메뉴 정보가 정상적으로 변경되었어요.');
            this.putMenuInfo();
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
    if (this.userId) return false;
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
          handler: () => {}
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
              this.noticeToast('가격은 필수 항목이에요.');
              this.price = null;
              return false;
            } else {
              this.price = data.price;
            }
            setValue('price', this.price);

            this.postMenuList();
          }
        }
      ]
    });
    await alert.present();
  }

  // pencil icon -> userMenu 변경 팝업
  async updateUserMenu() {
    if (this.state == ('선택완료' || '주문완료')) return false;
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
          handler: () => {}
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: (data) => {
            if (!data.userMenu) {
              this.noticeToast('메뉴명은 필수 항목이에요.');
              return false;
            } else {
              this.userMenu = data.userMenu;
              setValue('userMenu', this.userMenu);
            }

            if (!data.count) {
              this.count = 1;
            } else {
              this.count = data.count;
              setValue('count', this.count);
            }

            if (!data.price) {
              this.noticeToast('가격은 필수 항목이에요.');
              return false;
            } else {
              this.price = data.price;
              setValue('price', this.price);
            }

            this.putMenuList();
          }
        }
      ]
    });
    await alert.present();
  }

  async noticeToast(msg) {
    const toast = await this.toastCtrl.create({
      mode: 'md',
      message: msg,
      duration: 1000,
      cssClass: 'toast',
    });
    await toast.present();
  }
}
