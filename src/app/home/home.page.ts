import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

const setValue = async (key, value) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

const getValue = async (key) => {
  const { value } = await Storage.get({ key: key });
  return value;
};

const removeValue = async (key) => {
  await Storage.remove({ key: key });
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(private router: Router, public alertCtrl: AlertController) {}

//   refresh(ev) {
//     setTimeout(() => {
//       ev.detail.complete();
//     }, 3000);
//   }

  goResult() {
    this.router.navigate(['/result'])
  }

  goLogin() {
    this.router.navigate(['/login'])
  }

  reset() {
    removeValue('name');
    console.log('removed!')
  }

  async insertInfo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'insertInfo',
      header: '오늘의 메뉴 변경하기',
      subHeader: '메뉴에 대한 정보를 입력해주세요.',
      inputs: [
        {
          id: 'url',
          name: 'url',
          value: getValue('url'),
          placeholder: '링크를 입력해주세요.'
        },
        {
          id: 'menu',
          name: 'menu',
          type: 'text',
          value: getValue('menu'),
          placeholder: '표시할 메뉴를 입력해주세요.(선택)'
        },
        {
          id: 'etc',
          name: 'etc',
          type: 'text',
          value: getValue('etc') || "",
          placeholder: '기타사항을 입력해주세요.(선택)'
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
              return false;
            } else {
              setValue('url', data.url);
              setValue('menuInfo', " 링크 : " + data.url);
              console.log('메뉴 정보가 정상적으로 변경되었어요.');
              if (data.menu) {
                setValue('menu', data.menu);
                setValue('menuInfo', getValue('menuInfo') + " 메뉴 : " + data.menu);
              }
              if (data.etc) {
                setValue('etc', data.etc);
                setValue('menuInfo', getValue('menuInfo') + " 기타사항 : " + data.etc);
              }
              this.selectInfo(getValue('menuInfo'));
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async insertMenu() {
    const alert = await this.alertCtrl.create({
      cssClass: 'upsertMenu',
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
      cssClass: 'upsertMenu',
      header: '내 메뉴 변경하기',
      subHeader: '변경할 메뉴의 정보를 입력해주세요.',
      inputs: [
        {
          id: 'menuName',
          name: 'menuName',
          type: 'text',
          value: getValue('menuName'),
          placeholder: '메뉴명을 입력해주세요.'
        },
        {
          id: 'count',
          name: 'count',
          type: 'number',
          value: getValue('count'),
          placeholder: '수량을 입력해주세요.'
        },
        {
          id: 'price',
          name: 'price',
          type: 'number',
          value: getValue('price'),
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

  async selectInfo(msg?) {
    const alert = await this.alertCtrl.create({
      cssClass: 'insertInfo',
      header: '오늘의 메뉴 정보 보기',
      subHeader: '메뉴를 자세히 보려면 링크를 클릭하세요.',
      message: msg,
      buttons: [
        {
          text: '변경하기',
          cssClass: 'cancel',
          handler: () => {
            console.log('메뉴 변경 화면으로 이동했어요.');
            this.insertInfo();
          }
        },
        {
          text: '돌아가기',
          cssClass: 'confirm',
          handler: () => {
            console.log('홈 화면으로 돌아왔어요.');
          }
        }
      ]
    });

    await alert.present();
  }
}
