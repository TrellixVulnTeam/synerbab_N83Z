(self.webpackChunksngy_bab3=self.webpackChunksngy_bab3||[]).push([[1523],{1523:(n,t,e)=>{"use strict";e.r(t),e.d(t,{ResultPageModule:()=>p});var o=e(6274),i=e(4988),l=e(5401),r=e(3991),c=e(1855),s=e(2755),g=e(3606),a=e(8213);function u(n,t){if(1&n&&(g.TgZ(0,"ion-row",11),g.TgZ(1,"ion-col",12),g.TgZ(2,"ion-label"),g._uU(3),g.qZA(),g.qZA(),g.TgZ(4,"ion-col",13),g.TgZ(5,"ion-label"),g._uU(6),g.qZA(),g.qZA(),g.TgZ(7,"ion-col",14),g.TgZ(8,"ion-label"),g._uU(9),g.qZA(),g.qZA(),g.TgZ(10,"ion-col",15),g.TgZ(11,"ion-label"),g._uU(12),g.qZA(),g.qZA(),g.qZA()),2&n){const n=t.$implicit;g.Q6J("ngClass",t.last&&"last-row"),g.xp6(3),g.Oqu(n.name),g.xp6(3),g.Oqu(n.menu),g.xp6(3),g.Oqu(n.cnt+"\uac1c"),g.xp6(3),g.Oqu(n.price.toLocaleString("ko-KR")+"\uc6d0")}}function d(n,t){if(1&n&&(g.TgZ(0,"ion-row"),g.TgZ(1,"ion-col",16),g.TgZ(2,"ion-label"),g._uU(3),g.qZA(),g.qZA(),g.TgZ(4,"ion-col"),g.TgZ(5,"ion-label"),g._uU(6),g.qZA(),g.qZA(),g.qZA()),2&n){const n=t.$implicit;g.xp6(3),g.Oqu(n[0]),g.xp6(3),g.Oqu(n[1])}}const m=(n,t)=>(0,c.mG)(void 0,void 0,void 0,function*(){yield s.K.set({key:n,value:t})}),h=[{path:"",component:(()=>{class n{constructor(n,t){this.navCtrl=n,this.api=t,this.menuList=[],this.countList=[],this.counts={},this.totalAmount=0,this.totalPeople=0,this.setToday(),this.getMenuList()}getValue(n){return(0,c.mG)(this,void 0,void 0,function*(){return yield s.K.get({key:n})})}setToday(){const n=new Date,t=n.getFullYear(),e=("0"+(n.getMonth()+1)).slice(-2),o=("0"+n.getDate()).slice(-2),i=n.getHours();this.today=i<16?"L"+t+e+o:"D"+t+e+o}setCountList(){this.countList=Object.entries(this.counts).sort(),this.countList.map(n=>{this.totalPeople+=n[1]})}setMenuInfo(){return(0,c.mG)(this,void 0,void 0,function*(){yield this.getValue("userName").then(n=>{this.userName=n.value?n.value:"noData"}),yield this.getValue("url").then(n=>{this.url=n.value?n.value:"noData"}),yield this.getValue("menu").then(n=>{this.menu=n.value?n.value:"noData"}),yield this.getValue("infoId").then(n=>{this.infoId=n.value?n.value:"noData"})})}getMenuList(){this.api.getApi("menu",this.today).subscribe(n=>{this.menuList=JSON.parse(JSON.stringify(n)),this.menuList.forEach(n=>{this.counts[n.menu]=(this.counts[n.menu]||0)+n.cnt,this.totalAmount+=n.price*n.cnt}),this.setCountList()},n=>{console.log(JSON.stringify(n))})}updateState(n){return(0,c.mG)(this,void 0,void 0,function*(){yield this.api.getApi("badal",this.today).subscribe(n=>{n=JSON.parse(JSON.stringify(n)),m("userName",n[0].name),m("url",n[0].url),m("menu",n[0].menu)},n=>{console.log(JSON.stringify(n))}),yield this.setMenuInfo(),yield this.api.putApi("badal",this.infoId,{name:this.userName,url:this.url,menu:this.menu,etc:n}).subscribe(n=>{console.log(JSON.stringify(n))},n=>{console.log(JSON.stringify(n))})})}goBack(){this.navCtrl.back(),location.reload()}onComplete(n){this.updateState(n)}}return n.\u0275fac=function(t){return new(t||n)(g.Y36(l.SH),g.Y36(a.s))},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-result"]],decls:42,vars:5,consts:[[3,"fullscreen"],["id","menu"],[3,"click"],["name","arrow-back-circle"],["id","complete",3,"click"],["name","checkmark-circle"],[3,"ngClass",4,"ngFor","ngForOf"],["id","receipt"],[4,"ngFor","ngForOf"],["size","8",1,"result"],[1,"last-row"],[3,"ngClass"],["size","2"],["size","5",1,"align-left"],["size","1.5",1,"align-left"],["size","3",1,"align-right"],["size","8"]],template:function(n,t){1&n&&(g.TgZ(0,"ion-content",0),g.TgZ(1,"ion-card",1),g.TgZ(2,"ion-list"),g.TgZ(3,"ion-list-header"),g.TgZ(4,"ion-buttons"),g.TgZ(5,"ion-button",2),g.NdJ("click",function(){return t.goBack()}),g._UZ(6,"ion-icon",3),g.qZA(),g.qZA(),g.TgZ(7,"h2"),g._uU(8,"\uc624\ub298\uc758 \uba54\ub274"),g.qZA(),g.TgZ(9,"ion-buttons"),g.TgZ(10,"ion-button",4),g.NdJ("click",function(){return t.onComplete("\uc120\ud0dd\uc644\ub8cc")}),g.TgZ(11,"ion-label"),g._uU(12,"\uc120\ud0dd\uc644\ub8cc"),g.qZA(),g._UZ(13,"ion-icon",5),g.qZA(),g.qZA(),g.qZA(),g.TgZ(14,"ion-grid"),g.YNc(15,u,13,5,"ion-row",6),g.qZA(),g.qZA(),g.qZA(),g.TgZ(16,"ion-card",7),g.TgZ(17,"ion-list"),g.TgZ(18,"ion-list-header"),g.TgZ(19,"h2"),g._uU(20,"\uc8fc\ubb38\uc11c"),g.qZA(),g.TgZ(21,"ion-buttons"),g.TgZ(22,"ion-button",2),g.NdJ("click",function(){return t.onComplete("\uc8fc\ubb38\uc644\ub8cc"),t.goBack()}),g.TgZ(23,"ion-label"),g._uU(24,"\uc8fc\ubb38\uc644\ub8cc"),g.qZA(),g._UZ(25,"ion-icon",5),g.qZA(),g.qZA(),g.qZA(),g.TgZ(26,"ion-grid"),g.YNc(27,d,7,2,"ion-row",8),g.TgZ(28,"ion-row"),g.TgZ(29,"ion-col",9),g.TgZ(30,"ion-label"),g._uU(31,"\ucd1d \uc778\uc6d0"),g.qZA(),g.qZA(),g.TgZ(32,"ion-col"),g.TgZ(33,"ion-label"),g._uU(34),g.qZA(),g.qZA(),g.qZA(),g.TgZ(35,"ion-row",10),g.TgZ(36,"ion-col",9),g.TgZ(37,"ion-label"),g._uU(38,"\ucd1d \uae08\uc561"),g.qZA(),g.qZA(),g.TgZ(39,"ion-col"),g.TgZ(40,"ion-label"),g._uU(41),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA()),2&n&&(g.Q6J("fullscreen",!0),g.xp6(15),g.Q6J("ngForOf",t.menuList),g.xp6(12),g.Q6J("ngForOf",t.countList),g.xp6(7),g.hij(" ",t.totalPeople?t.totalPeople+"\uba85":"-"," "),g.xp6(7),g.hij(" ",t.totalAmount?t.totalAmount+"\uc6d0":"-"," "))},directives:[l.W2,l.PM,l.q_,l.yh,l.Sm,l.YG,l.gu,l.Q$,l.jY,o.sg,l.Nd,l.wI,o.mk],styles:["h2[_ngcontent-%COMP%]{font-weight:700;font-size:1.5rem;margin-right:3vw}ion-content[_ngcontent-%COMP%]{--ion-background-color:#dae0e9}ion-card[_ngcontent-%COMP%]{margin:3.7vw;padding-bottom:1.5vh;border-radius:.9rem;overflow:hidden;--ion-background-color:#fff;min-height:47vh}ion-list-header[_ngcontent-%COMP%]{margin-top:1vh}ion-grid[_ngcontent-%COMP%]{width:78vw;padding:0;margin-top:1.7vh;color:#000;text-align:center;border-collapse:collapse}ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{padding:.1rem;border:solid #ccc;border-width:.25vmin 0 0;min-height:2.5vh;align-items:center}ion-grid[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:.95rem}ion-grid[_ngcontent-%COMP%]   .last-row[_ngcontent-%COMP%]{border:solid #cacaca;border-width:.25vmin 0}ion-grid[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%]{background-color:#eaeaea;font-weight:700}#menu[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#002f67;font-size:1.6rem;margin:3vmin 3vmin 1vmin}#menu[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%]{height:2.5vh;margin-top:2vh}#menu[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:.6rem}#complete[_ngcontent-%COMP%]{height:1.8rem;padding:0 .4rem;margin-left:3.5rem;border:.25vmin solid #768dab;border-radius:.6rem}#complete[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#002f67;font-size:.78rem}#complete[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin:0;color:#002f67;font-size:.88rem;padding:1vmin}#receipt[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-left:7vw}#receipt[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{height:1.9rem;padding:0 .4rem;margin-left:8.3rem;border:.25vmin solid #768dab;border-radius:.6rem}#receipt[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#002f67;font-size:.78rem}#receipt[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#002f67;font-size:.88rem;padding:1vmin}.align-left[_ngcontent-%COMP%]{text-align:left}.align-right[_ngcontent-%COMP%]{text-align:right}"]}),n})()}];let Z=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=g.oAB({type:n}),n.\u0275inj=g.cJS({imports:[[r.Bz.forChild(h)],r.Bz]}),n})(),p=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=g.oAB({type:n}),n.\u0275inj=g.cJS({imports:[[o.ez,i.u5,l.Pc,Z]]}),n})()}}]);