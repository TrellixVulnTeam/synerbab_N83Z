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

/*
const getValue = async (key) => {
  const { value } = await Storage.get({ key: key });
  return value;
};
*/

const removeValue = async (key) => {
  await Storage.remove({ key: key });
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  url: string = '';
  menu: string = '';
  state: string = '';

  constructor(private router: Router, public alertCtrl: AlertController, private api: ApiService) {
    this.onPull();
//     let data = {
//                    "day": "2021-11-11",
//                    "name": "김하늘",
//                    "menu": "ddddd",
//                    "cnt": 1,
//                    "price": 12000
//                };
//     this.api.createApi('menu');
  }

  onPull() {
    this.getValue('url').then((data:any) => {
      if(data.value){
        this.url = data.value;
        setValue('url', this.url);
      }
    });

    this.getValue('menu').then((data:any) => {
      if(data.value){
        this.menu = data.value;
        setValue('menu', this.menu);
      }
    });
  }

  onRefresh(event) {
    console.log('Begin refreshing');

    setTimeout(() => {
      console.log('Finished refreshing');
      event.target.complete();
    }, 500);
  }

  onReset(key) {
    setValue(key, '');
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

  async getValue(key:string): Promise<{value:any}> {
    return await Storage.get({ key: key });
  };

  goResult() {
    this.router.navigate(['/result']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  async goLink() {
    await Browser.open({ url : this.url });
  }

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
              this.onReset('url');
              return false;
            }

            setValue('url', data.url);
            console.log('메뉴 정보가 정상적으로 변경되었어요.');

            if (data.menu) {
              setValue('menu', data.menu);
            } else {
              this.onReset('menu');
            }

            this.onPull();

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
            setValue('count', data.count);
            setValue('price', data.price);
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
          id: 'menuName',
          name: 'menuName',
          type: 'text',
          value: this.getValue('menuName'),
          placeholder: '메뉴명을 입력해주세요.'
        },
        {
          id: 'count',
          name: 'count',
          type: 'number',
          value: this.getValue('count'),
          placeholder: '수량을 입력해주세요.'
        },
        {
          id: 'price',
          name: 'price',
          type: 'number',
          value: this.getValue('price'),
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
            if (!data.menuName) {
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
            setValue('menuName', data.menuName);
            setValue('count', data.count);
            setValue('price', data.price);
          }
        }
      ]
    });

    await alert.present();
  }
}
