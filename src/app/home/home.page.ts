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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  userName: string;
  userMenu: string;
  menuList: Array<string> = [];
  count: string;
  price: string;
  url: string;
  menu: string;
  state: string = '선택중';
  today: string;

  constructor(private router: Router, public alertCtrl: AlertController, private api: ApiService) {

    const date = new Date();
    this.today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log(this.today);

    this.getValue('name').then((data: any) => {
      this.userName = data.value;
    });

//     this.onPull();

//     let data = {
//       "day": "2021-11-11",
//       "name": "김하늘",
//       "menu": "ddddd",
//       "cnt": 1,
//       "price": 12000
//     };
//     this.api.createApi('menu');
  }

  onChange(event) {
    this.userMenu = event.target.value;
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.createMenu();
    }
  }

  async getValue(key:string): Promise<{value:any}> {
    return await Storage.get({ key: key });
  };

  onRefresh(event) {
    console.log('Begin refreshing');
    this.api.getMenuList('menu','2021-11-12');

    setTimeout(() => {
      console.log('Finished refreshing');
      event.target.complete();
    }, 500);
  }

  onStorageReset() {
    this.userMenu = '';
    this.menuList = [];
    this.count = '';
    this.price = '';
    this.url = '';
    this.menu = '';
    this.state = '';
  }

  onStoragePrint() {
    console.log(this.userMenu);
    console.log(this.menuList);
    console.log(this.count);
    console.log(this.price);
    console.log(this.url);
    console.log(this.menu);
    console.log(this.state);
  }

  /* checkMenu(){
    this.getValue('url').then((data:any) => {
          if(data.value){
            this.url = data.value
          }else{
            console.log('noData')
          }
    });

    this.getValue('menu').then((data:any) => {
              if(data.value){
                this.menu = data.value
              }else{
                console.log('noData')
              }
        });
  } */

  /* matchValue(key:string, target:any) {
    this.getValue(key).then((data:any) => {
        if(data.value){
          console.log(data.value)
          target = data.value
        }else{
          console.log('noData')
        }
      });
  } */

  goResult() {
    this.router.navigate(['/result']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  async goLink() {
    this.url ? await Browser.open({ url : this.url }) : alert('아직 링크가 입력되지 않았네요.');
  }

//   onMenuPull() {
//     this.getValue('url').then((data:any) => {
//       if(data.value){
//         this.url = data.value;
//         setValue('url', this.url);
//       }
//     });
//
//     this.getValue('menu').then((data:any) => {
//       if(data.value){
//         this.menu = data.value;
//         setValue('menu', this.menu);
//       }
//     });
//   }

  async createInfo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'createInfo',
      header: '오늘의 메뉴 변경하기',
      subHeader: '메뉴는 10글자 이내로 입력해주세요.',
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
            if (!data.url) {
              console.log('링크는 필수 항목이에요.');
              setValue('url', '');
              this.url = '';
              return false;
            }
            if (!data.menu) {
              console.log('메뉴는 필수 항목이에요.');
              setValue('menu', '');
              this.menu = '';
              return false;
            }
            setValue('url', data.url);
            this.url = data.url;
            setValue('menu', data.menu);
            this.menu = data.menu;
            console.log('메뉴 정보가 정상적으로 변경되었어요.');
//             this.onMenuPull();
          }
        }
      ]
    });

    await alert.present().then(result => {
      document.getElementById('menu').setAttribute('maxLength', '10');
    });
  }

  async createMenu() {
    const alert = await this.alertCtrl.create({
      cssClass: 'createMenu',
      header: '내 메뉴 입력하기',
      subHeader: '메뉴의 수량과 가격을 입력해주세요.',
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
              console.log('수량은 필수 항목이에요.');
              return false;
            }
            if (!data.price) {
              console.log('가격은 필수 항목이에요.');
              return false;
            }
            this.menuList[0] = this.userMenu;
            this.count = data.count;
            this.price = data.price;
          }
        }
      ]
    });

    await alert.present();
  }

  async updateMenu() {
    const alert = await this.alertCtrl.create({
      cssClass: 'updateMenu',
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
              return false;
            }
            if (!data.count) {
              console.log('수량은 필수 항목이에요.');
              return false;
            }
            if (!data.price) {
              console.log('가격은 필수 항목이에요.');
              return false;
            }
            this.userMenu = data.userMenu;
            this.menuList[0] = this.userMenu;
            this.count = data.count;
            this.price = data.price;
          }
        }
      ]
    });

    await alert.present();
  }
}
