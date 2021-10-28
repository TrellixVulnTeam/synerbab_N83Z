import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(private router: Router, public alertCtrl: AlertController) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  goResult() {
    this.router.navigate(['/result'])
  }

  goLogin() {
    this.router.navigate(['/login'])
  }

  async insertInfo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'insertInfo',
      header: '오늘의 메뉴 등록하기',
      subHeader: '메뉴에 대한 정보를 입력해주세요.',
      inputs: [
        {
          id: 'url',
          name: 'url',
          placeholder: '링크를 입력해주세요.'
        },
        {
          id: 'menu',
          name: 'menu',
          type: 'text',
          placeholder: '표시할 메뉴를 입력해주세요.(선택)'
        },
        {
          id: 'etc',
          name: 'etc',
          type: 'text',
          placeholder: '기타사항을 입력해주세요.(선택)'
        }
      ],
      buttons: [
        {
          text: '취소하기',
          cssClass: 'cancel',
          handler: () => {
            console.log('insertInfo canceled');
          }
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: () => {
            console.log('insertInfo completed');
            this.selectInfo();
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
//       mode: "ios",
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
            console.log('insertMenu canceled');
          }
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: () => {
            console.log('insertMenu completed');
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
          id: 'menu',
          name: 'menu',
          type: 'text',
          placeholder: '메뉴를 입력해주세요.'
        },
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
            console.log('updateMenu canceled');
          }
        },
        {
          text: '확인하기',
          cssClass: 'confirm',
          handler: () => {
            console.log('updateMenu completed');
          }
        }
      ]
    });

    await alert.present();
  }

  async selectInfo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'insertInfo',
      header: '오늘의 메뉴 정보 보기',
      subHeader: '메뉴를 자세히 보려면 링크를 클릭하세요.',
      message: 'https://www.sngy.io',
      buttons: [
        {
          text: '변경하기',
          cssClass: 'cancel',
          handler: () => {
            console.log('go updateInfo');
            this.insertInfo();
          }
        },
        {
          text: '돌아가기',
          cssClass: 'confirm',
          handler: () => {
            console.log('go back');
          }
        }
      ]
    });

    await alert.present();
  }
}
