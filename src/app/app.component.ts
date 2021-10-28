import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
//   let isLogin = false;
  constructor(private router: Router) {
//     if (isLogin == false) {
//       isLogin = true;
      router.navigate(['/login']);
//     }
//     this.init();
  }

  init(){
//     login name if else
//     router.navigate(['/login']);
  }
}
