import { Component, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, IonContent, Platform } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../api.service';
import { Browser } from '@capacitor/browser';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

const removeValue = async (key) => {
  await Storage.remove({ key: key });
};

// export interface home {
//   url: string
//   menu: string
//   state: string
// }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  scrolling: boolean = false;

  today: string;

  infoId: any;
  userId: any;
  userName: string;

  url: string;
  menu: string;
//   state: string;

  menuList: Array<Object> = [];
  userMenu: string;
  count: number;
  price: number;


  getValue(key: string): Promise<{value: any}> {
    return Storage.get({ key: key });
  };


  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private api: ApiService,
    private platform: Platform,
    private _zone: NgZone,
    )
  {
    this.setToday();
    if (!this.userName) {
      this.setUserName();
    }
    this.getMenuList();
    this.getMenuInfo();
  }

  setLocal(key: string, value: any) {
    this[key] = value;
    setValue(key, value);
  }

  getLocal(key: string) {
    this.getValue(key).then((data: any) => {
      data.value ? (this[key] = data.value) : (this[key] = null);
//       data.value && (this[key] = data.value);
    });
  }

  removeLocal(key: string) {
    this[key] = null;
    removeValue(key);
  }

  // api를 조회해보고 값이 없으면 today가 바뀐 것이므로 값들을 reset 해준다. -> get에서 해주자.
  resetEveryValues() {
    this.removeLocal('infoId');
    this.removeLocal('userId');
    this.removeLocal('url');
    this.removeLocal('menu');
//     this.removeLocal('state');
    this.removeLocal('userMenu');
    this.removeLocal('count');
    this.removeLocal('price');
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
  setUserName() {
    this.getLocal('userName');
  }
  // getApi를 사용하여 값을 받아오고 나서 값이 local storage에 저장이 안돼서 다시 한 번 저장해준다.
  setInfoValue() {
    this.getLocal('infoId');
    this.getLocal('url');
    this.getLocal('menu');
//     this.getLocal('state');
//     this.getValue('infoId').then((data: any) => {
//       data.value && (this.infoId = data.value);
//     });
  }
  setListValue() {
    this.getLocal('userId');
    this.getLocal('userMenu');
    this.getLocal('count');
    this.getLocal('price');
  }


  // badal에서 url, menu, etc를 가져온다.
  getMenuInfo() {
    this.api.getApi('badal', this.today).subscribe(
      (success: Array<Object>) => {
        if (success === []) {
          this.resetEveryValues();
          return false;
        }
        let lastIndex = success.length - 1;
        this.infoId = success[lastIndex]['id'];
        this.url = success[lastIndex]['url'];
        this.menu = success[lastIndex]['menu'];
//         this.state = success[lastIndex]['etc'];
        setValue('infoId', success[lastIndex]['id']);
        setValue('url', success[lastIndex]['url']);
        setValue('menu', success[lastIndex]['menu']);
//         setValue('state', success[lastIndex]['etc']);
      },
      (error: Array<Object>) => {
        console.log(error);
      }
    );
    this.setInfoValue();
  }

  // menu에서 각 행을 가져와 menuList 배열에 저장한다.
  getMenuList() {
    this.api.getApi('menu', this.today).subscribe(
      (success: Array<Object>) => {
        if (success === []) {
          this.resetEveryValues();
          return false;
        }
        this.menuList = success;
        this.menuList.forEach((item: any) => {
          if (item.name === this.userName) {
            this.userId = item.id;
            this.userMenu = item.menu;
            this.count = item.cnt;
            this.price = item.price;
            setValue('userId', item.id);
            setValue('userMenu', item.menu);
            setValue('count', item.cnt);
            setValue('price', item.price);
          }
        })
      },
      (error: Array<Object>) => {
        console.log(error);
      }
    );
    this.setListValue();
  }

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
      (success: Array<Object>) => {
        console.log(success);
      },
      (error: Array<Object>) => {
        console.log(error);
      }
    );
  }

  // badal에서 변경된 url, menu, state(etc)를 저장한다. -> 이것만 써서 menuInfo를 변경하기 때문에 postMenuInfo는 불필요해짐
  putMenuInfo() {
    // 오늘의 menuInfo가 아직 없다면 postApi를 실행하고, 있다면 putApi를 실행한다.
    if (!this.infoId) {
      this.api.postApi('badal',
        {
            "day": this.today,
            "grp": "sky",
            "name": this.userName,
            "url": this.url,
            "menu": this.menu,
            "etc": 'state'
        }
      ).subscribe(
        (success: Array<Object>) => {
          console.log(success);
        },
        (error: Array<Object>) => {
          console.log(error);
        }
      );
    } else {
      this.api.putApi('badal', this.infoId,
        {
          "name": this.userName,
          "url": this.url,
          "menu": this.menu,
          "etc": 'state'
        }
      ).subscribe(
        (success: Array<Object>) => {
          console.log(success);
        },
        (error: Array<Object>) => {
          console.log(error);
        }
      );
    }
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
      (success: Array<Object>) => {
        console.log(success);
      },
      (error: Array<Object>) => {
        console.log(error);
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
  onChange(e) {
    this.userMenu = e.target.value;
  }
  // 버튼을 직접 누르지 않아도 enter 키를 통해 입력을 완료할 수 있도록 한다.
  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.createUserMenu();
    }
  }
  // 새로고침을 했을 때 다른 곳에서 변경되었을 가능성이 있는 데이터들을 다시 불러온다.
  onRefresh(event) {
    this.pageReload();

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  scrollStart() {
    this._zone.run(() => { this.scrolling = true; });
  }
  scrollEnd() {
    this._zone.run(() => { this.scrolling = false; });
  }

//   scrollDown() {
//     let that = this;
//     setTimeout(() => {
//       that.content.scrollToBottom(0);
//     }, 500);
//   }

  pageReload() {
    this.getMenuInfo();
    this.getMenuList();
    location.reload();
  }


  // hammer icon -> menu 설정 팝업
  async updateMenuInfo() {
//     if (this.state === ('선택마감' || '주문완료')) {
//       this.noticeToast(`${this.state} 상태예요.`);
//       return false;
//     }
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
            if (!data.url) {
              this.noticeToast('링크를 입력해주세요.');
              return false;
            }
            if (!data.menu) {
              this.noticeToast('상단에 표시할 메뉴를 입력해주세요.');
              return false;
            }

            this.url = data.url;
            setValue('url', this.url);
            this.menu = data.menu;
            setValue('menu', this.menu);
//             this.state = '선택중';
//             setValue('state', this.state);

            this.putMenuInfo();
            this.pageReload();
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
//     if (this.state === '') {
//       this.noticeToast('화면 상단에서 메뉴를 설정해주세요.');
//       return false;
//     }
//     if (this.state === ('선택마감' || '주문완료')) {
//       this.noticeToast(`${this.state} 상태예요.`);
//       return false;
//     }
    if (this.userId) {
      this.noticeToast('이미 메뉴를 선택하셨어요.');
      return false;
    }
    if (!this.userMenu) {
      this.noticeToast('주문할 메뉴를 입력해주세요.');
      return false;
    }
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
              this.noticeToast('가격을 입력해주세요.');
              return false;
            } else {
              this.price = data.price;
              setValue('price', this.price);
            }

            this.postMenuList();
            this.pageReload();
//             this.scrollDown();
          }
        }
      ]
    });
    await alert.present();
  }

  // pencil icon -> userMenu 변경 팝업
  async updateUserMenu() {
//     if (this.state === ('선택마감' || '주문완료')) {
//       this.noticeToast(`${this.state} 상태예요!`);
//       return false;
//     }
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
              this.noticeToast('메뉴명을 입력해주세요.');
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
              this.noticeToast('가격을 입력해주세요.');
              return false;
            } else {
              this.price = data.price;
              setValue('price', this.price);
            }

            this.putMenuList();
            this.pageReload();
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
